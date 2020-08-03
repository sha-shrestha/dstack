// @flow

import React, {useEffect, useState, useRef, useCallback, Fragment} from 'react';
import cx from 'classnames';
import {isEqual, get} from 'lodash-es';
import {usePrevious} from 'hooks';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {useHistory, useLocation, useParams} from 'react-router';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {debounce as _debounce} from 'lodash-es';
import {Button, AccessForbidden, MarkdownRender, Modal,
    Dropdown, NotFound, Yield, BackButton, StackFilters} from '@dstackai/dstack-react';
import Attachment from 'Stacks/components/Attachment';
import Loader from './components/Loader';
import Frames from './Frames';
import routes from 'routes';
import {useForm} from 'hooks';
import {isSignedIn, parseSearch, formatBytes, parseStackParams} from 'utils';
import {deleteStack} from 'Stacks/List/actions';
import {fetchDetails, clearDetails, fetchFrame, downloadAttachment, update} from './actions';
import HowToFetchData from 'Stacks/components/HowToFetchData';
import Upload from 'Stacks/components/Upload';
import css from './styles.module.css';

type Props = {
    frameAttachments: Array<{}>,
    attachmentRequestStatus: ?number,
    deleteStack: Function,
    fetchDetails: Function,
    fetchFrame: Function,
    clearDetails: Function,
    update: Function,
    requestStatus: ?number,
    frame: ?{},
    listData?: {},
    data?: {},
    frameRequestStatus: ?number,
    loadingFrame?: boolean,
    currentUser?: string,
}

const Details = ({
    frameAttachments,
    attachmentRequestStatus,
    fetchDetails,
    fetchFrame,
    downloadAttachment,
    clearDetails,
    update,
    data = {},
    listData = {},
    frame,
    frameRequestStatus,
    loading,
    requestStatus,
    currentUser,
}: Props) => {
    let parsedAttachmentIndex;

    const params = useParams();
    const {push} = useHistory();
    const location = useLocation();
    const searchParams = parseSearch(location.search);

    if (searchParams.a)
        parsedAttachmentIndex = parseInt(searchParams.a);

    const [attachmentIndex, setAttachmentIndex] = useState(parsedAttachmentIndex);
    const [selectedFrame, setSelectedFrame] = useState(searchParams.f);
    const [headId, setHeadId] = useState(null);

    const attachment = get(frameAttachments, attachmentIndex || 0, {});

    const {t} = useTranslation();
    const didMountRef = useRef(false);
    const {form, setForm, onChange} = useForm({});
    const [fields, setFields] = useState({});
    const prevFrame = usePrevious(frame);

    const [isShowHowToModal, setIsShowHowToModal] = useState(false);
    const [isShowUploadModal, setIsShowUploadModal] = useState(false);
    const isFirstChangeSearch = useRef(false);

    const showHowToModal = event => {
        event.preventDefault();
        setIsShowHowToModal(true);
    };

    const hideHowToModal = () => setIsShowHowToModal(false);

    const onClickDownloadAttachment = event => {
        event.preventDefault();
        downloadAttachment(`${params.user}/${params.stack}`, selectedFrame || headId, attachmentIndex || 0);
    };

    useEffect(() => {
        if (isFirstChangeSearch.current) {
            let parsedAttachmentIndex;

            if (searchParams.a)
                parsedAttachmentIndex = parseInt(searchParams.a);

            if (parsedAttachmentIndex !== attachmentIndex)
                setAttachmentIndex(parsedAttachmentIndex);

            if (searchParams.f !== selectedFrame)
                setSelectedFrame(searchParams.f);

        } else {
            isFirstChangeSearch.current = true;
        }
    }, [location.search]);

    useEffect(() => {
        let searchParams = {};

        if (attachmentIndex)
            searchParams.a = attachmentIndex;

        if (selectedFrame && selectedFrame !== headId)
            searchParams.f = selectedFrame;

        const searchString = Object
            .keys(searchParams)
            .map(key => `${key}=${searchParams[key]}`)
            .join('&');

        if (location.search.replace('?', '') !== searchString)
            push({search: searchString.length ? `?${searchString}` : ''});
    }, [attachmentIndex, selectedFrame, headId]);

    const fetchData = () => {
        fetchDetails(params.user, params.stack);
    };

    useEffect(() => {
        if (!data.head || !listData || (data.head.id !== listData.head))
            fetchData();

        return () => clearDetails();
    }, []);

    const setHeadFrame = frameId => {
        update({
            stack: `${data.user}/${data.name}`,
            noUpdateStore: true,
            head: frameId,
        }, () => setHeadId(frameId));
    };

    useEffect(() => {
        if (selectedFrame)
            fetchFrame(params.user, params.stack, selectedFrame);
    }, [selectedFrame]);

    useEffect(() => {
        if ((!isEqual(prevFrame, frame) || !didMountRef.current) && frame)
            parseParams();
    }, [frame]);

    useEffect(() => {
        if (data && data.head)
            setHeadId(data.head.id);
    }, [data]);

    const onChangeFrame = frameId => {
        setSelectedFrame(frameId);
        setAttachmentIndex(undefined);
    };

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
                    setAttachmentIndex(index);

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

    if (loading)
        return <Loader />;

    if (requestStatus === 403)
        return <AccessForbidden>
            {t('youDontHaveAnAccessToThisStack')}.

            {isSignedIn() && (
                <Fragment>
                    <br />

                    <Link to={routes.stacks(currentUser)}>
                        {t('goToMyStacks')}
                    </Link>
                </Fragment>
            )}
        </AccessForbidden>;

    if (requestStatus === 404)
        return <NotFound>
            {t('theStackYouAreRookingForCouldNotBeFound')}
            {' '}
            {isSignedIn() && (
                <Fragment>
                    <Link to={routes.stacks(currentUser)}>
                        {t('goToMyStacks')}
                    </Link>.
                </Fragment>
            )}
        </NotFound>;

    const currentFrame = selectedFrame ? selectedFrame : get(data, 'head.id');

    return (
        <div className={css.details}>
            <Helmet>
                <title>dstack.ai | {params.user} | {params.stack}</title>
            </Helmet>

            <Yield name="header-yield">
                <BackButton
                    Component={Link}
                    to={routes.stacks(params.user)}
                >
                    {(currentUser === params.user)
                        ? t('backToMyStacks')
                        : t('backToStacksOF', {name: params.user})
                    }
                </BackButton>
            </Yield>

            <section className={css.section}>
                <div className={css.header}>
                    <div className={css.title}>
                        {data.name}
                        <span className={`mdi mdi-lock${data.private ? '' : '-open'}`} />
                    </div>

                    {data && data.user === currentUser && (
                        <Dropdown
                            className={css.dropdown}

                            items={[
                                {
                                    title: t('upload'),
                                    onClick: () => setIsShowUploadModal(true),
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

                <Frames
                    frames={get(data, 'frames', [])}
                    frame={currentFrame}
                    headId={headId}
                    onMarkAsHead={setHeadFrame}
                    onChange={onChangeFrame}
                    className={css.revisions}
                />

                {!frameRequestStatus && renderFields()}

                {attachment && (
                    <div className={css['attachment-head']}>
                        <div className={css.description}>
                            {attachment.description && (<MarkdownRender source={attachment.description} />)}
                        </div>

                        {attachment.type === 'text/csv' && (
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

                {attachmentRequestStatus === 404 || frameRequestStatus === 404 && (
                    <div className={css.empty}>{t('noMatch')}</div>
                )}

                {(frame && !attachmentRequestStatus && !frameRequestStatus) && (
                    <Attachment
                        className={css.attachment}
                        withLoader
                        stack={`${params.user}/${params.stack}`}
                        frameId={currentFrame}
                        id={attachmentIndex || 0}
                    />
                )}
            </section>

            <Upload
                stack={params.stack}
                isShow={isShowUploadModal}
                onClose={() => setIsShowUploadModal(false)}
                refresh={fetchData}
            />

            <Modal
                isShow={isShowHowToModal}
                withCloseButton
                onClose={hideHowToModal}
                size="big"
                title={t('howToFetchDataUsingTheAPI')}
                className={css.modal}
            >
                <HowToFetchData
                    data={{
                        stack: `${params.user}/${params.stack}`,
                        params: form,
                    }}

                    modalMode
                />
            </Modal>
        </div>
    );
};

export default connect(
    (state, props) => {
        const frame = state.stacks.details.frame;
        const frameAttachments = get(state.stacks.attachments.data, frame?.id, {});
        const stack = props.location.pathname.replace(/^\//, '');

        return {
            data: get(state.stacks.details.data, stack),
            listData: state.stacks.list.data && state.stacks.list.data.find(i => `${i.user}/${i.name}` === stack),
            requestStatus: state.stacks.details.requestStatus,
            frame,
            frameRequestStatus: state.stacks.details.frameRequestStatus,
            loadingFrame: state.stacks.details.loadingFrame,
            attachmentRequestStatus: state.stacks.details.attachmentRequestStatus,
            frameAttachments,
            loading: state.stacks.details.loading,
            currentUser: state.app.userData?.user,
        };
    },

    {
        fetchDetails,
        clearDetails,
        deleteStack,
        fetchFrame,
        update,
        downloadAttachment,
    },
)(Details);
