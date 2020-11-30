// @flow

import React, {useEffect, useState, useRef, useCallback} from 'react';
import cx from 'classnames';
import {isEqual, get} from 'lodash-es';
import {useDebounce} from 'react-use';
import usePrevious from '../../hooks/usePrevious';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import Button from '../../Button';
import MarkdownRender from '../../MarkdownRender';
import Modal from '../../Modal';
import Dropdown from '../../Dropdown';
import Yield from '../../Yield';
import BackButton from '../../BackButton';
import Share from '../../Share';
import PermissionUsers from '../../PermissionUsers';
import StackFilters from '../../StackFilters';
import StackHowToFetchData from '../HowToFetchData';
import StackAttachment from '../Attachment';
import StackFrames from '../Frames';
import Loader from '../Details/components/Loader';
import FilterLoader from './components/Loader';
import Tabs from '../Details/components/Tabs';
import Readme from '../Details/components/Readme';
import Progress from './components/Progress';
import useForm from '../../hooks/useForm';
import {formatBytes, parseStackTabs, parseStackViews} from '../../utils';
import actions from '../actions';
import css from './styles.module.css';

const REFRESH_INTERVAL = 1000;

type Props = {
    loading: boolean,
    currentFrameId: number,
    attachmentIndex: number,
    frame: ?{},
    data: {},
    currentUser?: string,
    downloadAttachment: Function,
    toggleUpload: Function,
    backUrl: string,
    user: string,
    stack: string,
    headId: number,
    onChangeHeadFrame: Function,
    onChangeAttachmentIndex: Function,
    onUpdateReadme: Function,
    onChangeFrame: Function,
    configurePythonCommand: string,
    configureRCommand: string,
    setPrivate: Function,
    updatePermissions: Function,
}

const Details = ({
    currentFrameId,
    headId,
    onChangeHeadFrame,
    attachmentIndex,
    onChangeAttachmentIndex,
    downloadAttachment,
    onChangeFrame,
    onUpdateReadme,
    data,
    frame,
    loading,
    currentUser,
    toggleUpload,
    backUrl,
    user,
    stack,
    configurePythonCommand,
    configureRCommand,
    setPrivate,
    updatePermissions,
}: Props) => {
    const {t} = useTranslation();
    const didMountRef = useRef(false);
    const {form, setForm, onChange} = useForm({});
    const [fields, setFields] = useState({});
    const [executeData, setExecuteData] = useState(null);
    const [executing, setExecuting] = useState(false);
    const [calculating, setCalculating] = useState(false);
    const [appAttachment, setAppAttachment] = useState(null);
    const [activeTab, setActiveTab] = useState();
    const [tabs, setTabs] = useState([]);
    const prevFrame = usePrevious(frame);
    const {executeStack, pollStack} = actions();

    const [isShowHowToModal, setIsShowHowToModal] = useState(false);

    const showHowToModal = event => {
        event.preventDefault();
        setIsShowHowToModal(true);
    };

    const getFormFromViews = views => {
        if (!views || !Array.isArray(views))
            return {};

        return views.reduce((result, view, index) => {
            switch (view.type) {
                case 'ApplyView':
                    return result;
                case 'SliderView':
                    result[index] = view.data[view.selected];
                    break;
                case 'ComboBoxView':
                    result[index] = view.selected;
                    break;
                default:
                    result[index] = view.data;
            }

            return result;
        }, {});
    };

    const updateExecuteData = data => {
        const fields = parseStackViews(data.views);
        const form = getFormFromViews(data.views);

        setFields(fields);
        setForm(form);
        setExecuteData(data);
    };

    const hasApplyButton = () => {
        if (!executeData?.views || !Array.isArray(executeData.views))
            return false;

        return executeData.views.some(view => view.type === 'ApplyView');
    };

    const submit = (form, apply = true) => {
        setExecuting(true);

        if (apply)
            setCalculating(true);
        else
            setAppAttachment(null);

        executeStack({
            user: data.user,
            stack: data.name,
            frame: frame?.id,
            attachment: attachmentIndex || 0,
            apply,
            views: executeData.views.map((view, index) => {
                switch (view.type) {
                    case 'ApplyView':
                        return view;
                    case 'ComboBoxView':
                        view.selected = form[index];
                        break;
                    case 'SliderView':
                        view.selected = view.data.findIndex(i => i === form[index]);
                        break;
                    default:
                        view.data = form[index];
                }

                return view;
            }),
        })
            .then(data => {
                setExecuting(false);
                updateExecuteData(data);

                if (apply)
                    checkFinished({id: data.id});
            });
    };

    useDebounce(() => {
        if (!isEqual(form, getFormFromViews(executeData?.views)) && !executing) {
            submit(form, !!(!hasApplyButton() && appAttachment));
        }
    }, 300, [form]);

    const onApply = () => submit(form);

    useEffect(() => {
        if (executeData && executeData.status === 'READY' && !appAttachment && !executing) {
            if (!hasApplyButton())
                submit(form, true);
        }
    }, [executeData]);

    useEffect(() => {
        if (data && frame && !loading) {
            setExecuting(true);
            setExecuteData(null);
            setAppAttachment(null);

            executeStack({
                user: data.user,
                stack: data.name,
                frame: frame?.id,
                attachment: attachmentIndex || 0,
            })
                .then(data => {
                    setExecuting(false);
                    updateExecuteData(data);
                })
                .catch(() => setExecuting(false));
        }

    }, [data, frame, attachmentIndex]);

    const hideHowToModal = () => setIsShowHowToModal(false);

    useEffect(() => {
        if ((!isEqual(prevFrame, frame) || !didMountRef.current) && frame)
            parseTabs();
    }, [frame]);

    useEffect(() => {
        if (!didMountRef.current)
            didMountRef.current = true;
    }, []);

    const getCurrentAttachment = selectedTab => {
        const attachments = get(frame, 'attachments');

        let attachment;

        if (selectedTab) {
            attachment = attachments.find(attach => {
                return (attach.params[selectedTab.value]?.type === 'tab'
                    || attach.params[selectedTab.key]?.title === selectedTab.value
                );
            });

        } else if (attachmentIndex !== undefined) {
            if (attachments[attachmentIndex]) {
                attachment = attachments[attachmentIndex];
            }
        } else {
            attachment = attachments[0];
        }

        return attachment;
    };

    const parseTabs = () => {
        const attachments = get(frame, 'attachments');

        if (!attachments || !attachments.length)
            return;

        const tabs = parseStackTabs(attachments);
        const attachment = getCurrentAttachment();

        setTabs(tabs);

        if (attachment) {
            const params = {...attachment.params};
            const tab = Object.keys(params).find(key => params[key]?.type === 'tab');

            setActiveTab((params[tab]?.title || tab || null));
        }
    };

    // const onClickDownloadAttachment = event => {
    //     event.preventDefault();
    //     downloadAttachment();
    // };

    const onChangeTab = tabName => {
        setActiveTab(tabName);

        const attachments = get(frame, 'attachments');
        const tab = tabs.find(t => t.value === tabName);

        if (!attachments)
            return;

        if (tabs.length) {
            attachments.some((attach, index) => {

                if (tab
                    && attach.params[tab.value]?.type !== 'tab'
                    && attach.params[tab.key]?.title !== tab.value
                )
                    return false;

                onChangeAttachmentIndex(index);

                return true;
            });
        }
    };

    const checkFinished = ({id}) => {
        pollStack({id: id})
            .then(data => {
                if (['SCHEDULED', 'RUNNING'].indexOf(data.status) >= 0)
                    setTimeout(() => {
                        checkFinished({id: data.id});
                    }, REFRESH_INTERVAL);

                if (['FINISHED', 'FAILED', 'READY'].indexOf(data.status) >= 0) {
                    setCalculating(false);
                }

                if (data.status === 'FINISHED') {
                    setAppAttachment(data.output);
                }
            });
    };

    if (loading)
        return <Loader />;

    return (
        <div className={cx(css.details)}>
            <Yield name="header-yield">
                <BackButton
                    Component={Link}
                    to={backUrl}
                >
                    {(currentUser === user)
                        ? t('backToMyStacks')
                        : t('backToStacksOf', {name: user})
                    }
                </BackButton>
            </Yield>

            <div className={css.header}>
                <div className={css.title}>
                    {data.name}
                    <span className={`mdi mdi-lock${data.private ? '' : '-open'}`} />
                </div>

                {data.private && (
                    <PermissionUsers
                        className={css.permissions}
                        permissions={data.permissions}
                    />
                )}

                <div className={css.sideHeader}>
                    {data && data.user === currentUser && (
                        <Share
                            instancePath={`${user}/${stack}`}
                            onUpdatePrivate={setPrivate}
                            className={css.share}
                            defaultIsPrivate={data.private}
                            defaultPermissions={data.permissions}

                            onUpdatePermissions={
                                permissions => updatePermissions(`${user}/${stack}`, permissions)
                            }
                        />
                    )}

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

            {Boolean(tabs.length) && <Tabs
                className={css.tabs}
                onChange={onChangeTab}
                value={activeTab}
                disabled={executing || calculating}
                items={tabs}
            />}

            {(!executeData && executing) && <div className={css.container}>
                <FilterLoader />
            </div>}

            {executeData && (
                <div className={css.container}>
                    <StackFilters
                        fields={fields}
                        form={form}
                        onChange={onChange}
                        onApply={onApply}
                        className={cx(css.filters)}
                        disabled={executing || calculating}
                    />

                    {appAttachment
                    && (appAttachment.description || appAttachment['content_type'] === 'text/csv')
                    && (
                        <div className={css['attachment-head']}>
                            <div className={css.description}>
                                {appAttachment.description && (<MarkdownRender source={appAttachment.description} />)}
                            </div>

                            {appAttachment['content_type'] === 'text/csv' && (
                                <div className={css.actions}>
                                    {appAttachment.preview && (
                                        <div className={css.label}>
                                            {t('preview')}

                                            <div className={css['label-tooltip']}>
                                                {t('theTableBelowShowsOnlyAPreview')}
                                            </div>
                                        </div>
                                    )}

                                    <a href="#" onClick={showHowToModal}>{t('useThisStackViaAPI')}</a>
                                    {/*<span>{t('or')}</span>*/}
                                    {/*<a href="#" onClick={onClickDownloadAttachment}>{t('download')}</a>*/}
                                    {appAttachment.length && (
                                        <span className={css.size}>({formatBytes(appAttachment.length)})</span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {appAttachment && !calculating && (
                        <StackAttachment
                            className={css.attachment}
                            stack={`${user}/${stack}`}
                            customData={appAttachment}
                        />
                    )}

                    {calculating && <Progress />}
                </div>
            )}

            {data && (
                <Readme
                    className={css.readme}
                    data={data}
                    onUpdate={onUpdateReadme}
                />
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
                    configurePythonCommand={configurePythonCommand}
                    configureRCommand={configureRCommand}

                    data={{
                        stack: `${user}/${stack}`,
                        params: {},
                    }}

                    modalMode
                />
            </Modal>
        </div>
    );
};

export default Details;
