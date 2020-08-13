// @flow

import React, {useEffect, useState, useRef, useCallback} from 'react';
import cx from 'classnames';
import {isEqual, get} from 'lodash-es';
import usePrevious from '../../hooks/usePrevious';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {debounce as _debounce} from 'lodash-es';
import Button from '../../Button';
import MarkdownRender from '../../MarkdownRender';
import Modal from '../../Modal';
import Dropdown from '../../Dropdown';
import Yield from '../../Yield';
import BackButton from '../../BackButton';
import StackFilters from '../../StackFilters';
import StackHowToFetchData from '../HowToFetchData';
import StackAttachment from '../Attachment';
import StackFrames from '../Frames';
import Loader from './components/Loader';
import useForm from '../../hooks/useForm';
import {formatBytes, parseStackParams} from '../../utils';
import css from './styles.module.css';

type Props = {
    loading: boolean,
    currentFrameId: number,
    attachmentIndex: number,
    frame: ?{},
    data: {},
    currentUser?: string,
    currentUserToken?: string,
    downloadAttachment: Function,
    toggleUpload: Function,
    backUrl: string,
    user: string,
    stack: string,
    headId: number,
    onChangeHeadFrame: Function,
    onChangeAttachmentIndex: Function,
    onChangeFrame: Function,
    renderHeader?: Function,
    renderSideHeader?: Function,
    renderSidebar?: Function,
}

const Details = ({
    currentFrameId,
    headId,
    onChangeHeadFrame,
    attachmentIndex,
    onChangeAttachmentIndex,
    downloadAttachment,
    onChangeFrame,
    data,
    frame,
    loading,
    currentUser,
    currentUserToken,
    toggleUpload,
    backUrl,
    user,
    stack,
    renderHeader,
    renderSideHeader,
    renderSidebar,
}: Props) => {
    const {t} = useTranslation();
    const didMountRef = useRef(false);
    const {form, setForm, onChange} = useForm({});
    const [fields, setFields] = useState({});
    const prevFrame = usePrevious(frame);

    const [isShowHowToModal, setIsShowHowToModal] = useState(false);

    const showHowToModal = event => {
        event.preventDefault();
        setIsShowHowToModal(true);
    };

    const hideHowToModal = () => setIsShowHowToModal(false);

    useEffect(() => {
        if ((!isEqual(prevFrame, frame) || !didMountRef.current) && frame)
            parseParams();
    }, [frame]);

    const findAttach = (form, attachmentIndex) => {
        const attachments = get(frame, 'attachments');
        const fields = Object.keys(form);

        if (!attachments)
            return;

        if (fields.length) {
            attachments.some((attach, index) => {
                let valid = true;

                fields.forEach(key => {
                    if (!attach.params || !isEqual(attach.params[key], form[key]))
                        valid = false;
                });

                if (valid && !(attachmentIndex === undefined && index === 0))
                    onChangeAttachmentIndex(index);

                return valid;
            });
        }
    };

    const findAttachDebounce = useCallback(_debounce(findAttach, 300), [data, frame]);

    useEffect(() => {
        if (didMountRef.current)
            findAttachDebounce(form, attachmentIndex);
        else
            didMountRef.current = true;
    }, [form]);

    const parseParams = () => {
        const attachments = get(frame, 'attachments');

        if (!attachments || !attachments.length)
            return;

        const fields = parseStackParams(attachments);

        setFields(fields);

        if (attachmentIndex !== undefined) {
            if (attachments[attachmentIndex])
                setForm(attachments[attachmentIndex].params);
        } else
            setForm(attachments[0].params);

    };

    const renderFields = () => {
        if (!Object.keys(fields).length)
            return null;

        const hasSelectField = Object.keys(fields).some(key => fields[key].type === 'select');

        return (
            <StackFilters
                fields={fields}
                form={form}
                onChange={onChange}
                className={cx(css.filters, {'with-select': hasSelectField})}
            />
        );
    };

    const onClickDownloadAttachment = event => {
        event.preventDefault();
        downloadAttachment();
    };

    const attachment = get(frame, `attachments[${attachmentIndex}]`);

    if (loading)
        return <Loader />;

    return (
        <div className={cx(css.details, {'with-sidebar': Boolean(renderSidebar)})}>
            <Yield name="header-yield">
                <BackButton
                    Component={Link}
                    to={backUrl}
                >
                    {(currentUser === user)
                        ? t('backToMyStacks')
                        : t('backToStacksOF', {name: user})
                    }
                </BackButton>
            </Yield>

            <section className={css.section}>
                <div className={css.header}>
                    <div className={css.title}>
                        {data.name}
                        <span className={`mdi mdi-lock${data.private ? '' : '-open'}`} />
                    </div>

                    {renderHeader && renderHeader()}

                    <div className={css.sideHeader}>
                        {renderSideHeader && renderSideHeader()}

                        {data && data.user === currentUser && (
                            <Dropdown
                                className={css.dropdown}

                                items={[
                                    {
                                        title: t('upload'),
                                        onClick: toggleUpload,
                                    },
                                ]}
                            >
                                <Button
                                    className={css['dropdown-button']}
                                    color="secondary"
                                >
                                    <span className="mdi mdi-dots-horizontal" />
                                </Button>
                            </Dropdown>
                        )}
                    </div>
                </div>

                <StackFrames
                    frames={get(data, 'frames', [])}
                    frame={currentFrameId}
                    headId={headId}
                    onMarkAsHead={onChangeHeadFrame}
                    onChange={onChangeFrame}
                    className={css.revisions}
                />

                {renderFields()}

                {attachment && (
                    <div className={css['attachment-head']}>
                        <div className={css.description}>
                            {attachment.description && (<MarkdownRender source={attachment.description} />)}
                        </div>

                        {attachment['content_type'] === 'text/csv' && (
                            <div className={css.actions}>
                                {attachment.preview && (
                                    <div className={css.label}>
                                        {t('preview')}

                                        <div className={css['label-tooltip']}>
                                            {t('theTableBelowShowsOnlyAPreview')}
                                        </div>
                                    </div>
                                )}

                                <a href="#" onClick={showHowToModal}>{t('useThisStackViaAPI')}</a>
                                <span>{t('or')}</span>
                                <a href="#" onClick={onClickDownloadAttachment}>{t('download')}</a>
                                {attachment.length && (
                                    <span className={css.size}>({formatBytes(attachment.length)})</span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {frame && (
                    <StackAttachment
                        className={css.attachment}
                        withLoader
                        stack={`${user}/${stack}`}
                        frameId={frame.id}
                        id={attachmentIndex || 0}
                    />
                )}
            </section>

            {Boolean(renderSidebar) && (
                <aside className={css.sidebar}>
                    {renderSidebar()}
                </aside>
            )}

            <Modal
                isShow={isShowHowToModal}
                withCloseButton
                onClose={hideHowToModal}
                size="big"
                title={t('howToFetchDataUsingTheAPI')}
                className={css.modal}
            >
                <StackHowToFetchData
                    user={currentUser}
                    token={currentUserToken}

                    data={{
                        stack: `${user}/${stack}`,
                        params: form,
                    }}

                    modalMode
                />
            </Modal>
        </div>
    );
};

export default Details;
