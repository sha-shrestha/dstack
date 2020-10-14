// @flow
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AccessForbidden, NotFound, StretchTitleField, Dropdown, Button} from '@dstackai/dstack-react';
import ScheduleSettings from './components/ScheduleSettings';
import CodeEditor from './components/CodeEditor';
import Status from './components/Status';
import Logs from './components/Logs';
import Progress from './components/Progress';
import Loader from './components/Loader';
import {usePrevious, useDebounce} from '@dstackai/dstack-react/dist/hooks';
import {isSignedIn} from '@dstackai/dstack-react/dist/utils';
import routes from 'routes';
import {fetch, update, remove, run, stop} from './actions';
import {setAppProgress, resetAppProgress} from 'App/actions';
import {Job} from 'Jobs/types';
import css from './styles.module.css';

type Props = {
    data?: Job,
    fetch: Function,
    remove: Function,
    run: Function,
    stop: Function,
    update: Function,
    setAppProgress: Function,
    resetAppProgress: Function,
    loading: boolean,
    running: boolean,
    stopping: boolean,
    currentUser?: string,
    requestStatus: ?number,
}

const REFRESH_TIMEOUT = 3000;

const Details = ({
    data, loading, remove, run, stop, running,
    stopping, fetch, requestStatus, currentUser, update, setAppProgress, resetAppProgress,
}: Props) => {
    const {user, id} = useParams();
    const {push} = useHistory();
    const {t} = useTranslation();
    const prevData = usePrevious(data);
    const [titleValue, setTitleValue] = useState(data ? data.title : '');
    const [code, setCode] = useState(data ? data.code : '');
    const [codeSaved, setCodeSaved] = useState(true);
    const isDidMount = useRef(true);
    const updateDebounce = useDebounce(update, 1000, []);
    const updateLongDebounce = useDebounce(update, 2000, []);
    const isAutoRefresh = useRef(false);
    const autoRefresh = useRef(() => {});
    const refreshTimeout = useRef();

    useEffect(() => {
        fetch(user, id);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', detectEnterPress);
        return () => window.removeEventListener('keydown', detectEnterPress);
    }, [data, code]);

    const detectEnterPress = event => {
        if (event.code === 'Enter' && (event.shiftKey || event.ctrlKey)) {
            event.preventDefault();

            if (!running && !stopping)
                onClickRun();
        }
    };

    useEffect(() => {
        clearTimeout(refreshTimeout.current);

        autoRefresh.current = () => {
            refreshTimeout.current = setTimeout(() => {
                if (isAutoRefresh.current)
                    fetch(user, id, autoRefresh.current, autoRefresh.current);
                else
                    autoRefresh.current();
            }, REFRESH_TIMEOUT);
        };

        autoRefresh.current();

        return () => {
            isAutoRefresh.current = false;
            clearTimeout(refreshTimeout.current);
        };
    }, []);

    useEffect(() => {
        if (prevData?.id !== data?.id) {
            setTitleValue(data.title);
            setCode(data.code);
        }

        if (isDidMount.current)
            isDidMount.current = false;

        if (data?.status === 'RUNNING') {
            const estimatedDuration = data['estimated_duration'] || 600000;
            const currentDuration = Date.now() - data.started;
            const progress = Math.min(currentDuration / estimatedDuration * 100, 100).toFixed();

            setAppProgress(progress);
        } else
            resetAppProgress();

        if (['RUNNING', 'SCHEDULED'].indexOf(data?.status) >= 0) {
            if (!isAutoRefresh.current)
                isAutoRefresh.current = true;
        } else if (isAutoRefresh.current)
            isAutoRefresh.current = false;

        return () => {
            resetAppProgress();
        };
    }, [data]);

    const onChangeTitle = event => {
        setTitleValue(event.target.value);

        updateDebounce({
            user: user,
            id: data.id,
            title: event.target.value,
        });
    };

    const onChangeCode = value => {
        setCode(value);
        setCodeSaved(false);

        updateLongDebounce(
            {
                user: user,
                id: data.id,
                code: value,
            },

            () => setCodeSaved(true),
        );
    };

    const onChangeRuntime = runtime => {
        update({
            user: user,
            id: data.id,
            runtime: runtime,
        });
    };

    const onChangeSchedule = schedule => {
        update({
            user: user,
            id: data.id,
            schedule: schedule,
        });
    };

    const onClickRun = () => run({
        user: user,
        id: data.id,
        code,
    });

    const onClickStop = () => stop({
        user: user,
        id: data.id,
    });

    const onClickDelete = () => {
        remove(
            {
                user: user,
                id: data.id,
            },

            () => push(routes.jobs(user))
        );
    };

    if (loading && (!data || data.id !== id))
        return <Loader />;

    if (requestStatus === 403)
        return <AccessForbidden>
            {t('youDontHaveAnAccessToThisJob')}.

            {isSignedIn() && (
                <Fragment>
                    <br />

                    <Link to={routes.dashboards(currentUser)}>
                        {t('goToMyJobs')}
                    </Link>
                </Fragment>
            )}
        </AccessForbidden>;

    if (requestStatus === 404)
        return <NotFound>
            {t('theJobYouAreRookingForCouldNotBeFound')}
            {' '}
            {isSignedIn() && (
                <Fragment>
                    <Link to={routes.dashboards(currentUser)}>
                        {t('goToMyJobs')}
                    </Link>.
                </Fragment>
            )}
        </NotFound>;

    if (!data)
        return null;

    return (
        <div className={css.details}>
            <div className={css.header}>
                <div className={css.title}>
                    <StretchTitleField
                        className={css.edit}
                        value={titleValue}
                        onChange={onChangeTitle}
                        readOnly={currentUser !== user}
                        placeholder={t('newJob')}
                    />
                </div>

                <div className={css.side}>
                    {data.status === 'RUNNING' && (
                        <Progress onlyDuration className={css.progress} data={data} />
                    )}

                    {data.status === 'FAILED' && (
                        <div className="red-text">{t('sorryButYourCodeDoesntLookLikePythonJob')}</div>
                    )}

                    {['RUNNING', 'SCHEDULED', 'STOPPING'].indexOf(data.status) >= 0
                        ? <Button
                            className={css.button}
                            color="fail"
                            size="small"
                            variant="contained"
                            disabled={stopping}
                            onClick={onClickStop}
                        >
                            <span className="mdi mdi-pause" />
                            {t('stop')}
                        </Button>

                        : <Button
                            className={css.button}
                            color="success"
                            size="small"
                            variant="contained"
                            disabled={running}
                            onClick={onClickRun}
                        >
                            <span className="mdi mdi-play" />
                            {t('run')}
                        </Button>
                    }
                </div>

                {currentUser === user && <Dropdown
                    className={css.dropdown}

                    items={[
                        {
                            title: t('delete'),
                            onClick: onClickDelete,
                        },
                    ]}
                >
                    <Button
                        className={css['dropdown-button']}
                        color="secondary"
                    >
                        <span className="mdi mdi-dots-horizontal" />
                    </Button>
                </Dropdown>}
            </div>

            <Status data={data} />

            <ScheduleSettings
                className={css.schedule}
                data={data}
                onChange={onChangeSchedule}
                onChangeRuntime={onChangeRuntime}
            />

            <CodeEditor
                className={css.codeEditor}
                value={code}
                onChange={onChangeCode}
                language={data.runtime}
                saved={codeSaved}
            />

            <Logs
                className={css.logs}
                data={data}
            />
        </div>
    );
};

export default connect(
    state => ({
        currentUser: state.app.userData?.user,
        data: state.jobs.details.data,
        loading: state.jobs.details.loading,
        running: state.jobs.details.running,
        stopping: state.jobs.details.stopping,
        requestStatus: state.jobs.details.requestStatus,
    }),
    {fetch, update, remove, run, stop, setAppProgress, resetAppProgress}
)(Details);