// @flow
import React, {useEffect, useState, useRef, memo} from 'react';
import {isEqual} from 'lodash-es';
import {connect} from 'react-redux';
import {useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import cx from 'classnames';
import {Dropdown} from '@dstackai/dstack-react';
import {usePrevious} from '@dstackai/dstack-react/dist/hooks';
import {fetchJob, runJob, stopJob} from 'Jobs/utils';
import Progress from 'Jobs/Details/components/Progress';
import {getFormattedDuration} from '@dstackai/dstack-react/dist/utils';
import css from './styles.module.css';

type Props = {
    data: {[key: string]: any},
    currentUSer?: string,
    onClickRow?: Function,
    onEdit?: Function,
    onRun?: Function,
    onDelete?: Function,
    fetch: Function,
    run: Function,
    stop: Function,
};

const REFRESH_TIMEOUT = 2000;

const TableRow = memo(({
    data,
    currentUSer,
    onClickRow,
    onEdit,
    onDelete,
}: Props) => {
    const {t} = useTranslation();
    const {user} = useParams();
    const prevData = usePrevious(data);
    const [jobData, setJobData] = useState(data);
    const refreshTimeout = useRef();
    const isAutoRefresh = useRef(false);
    const autoRefresh = useRef(() => {});

    useEffect(() => {
        clearTimeout(refreshTimeout.current);

        autoRefresh.current = () => {
            refreshTimeout.current = setTimeout(async () => {
                if (isAutoRefresh.current) {
                    const {job} = await fetchJob({user, id: jobData.id});

                    if (job)
                        setJobData({
                            ...jobData,
                            ...job,
                        });
                }

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
        if (!isEqual(prevData, data))
            setJobData(data);
    }, [data]);

    const rowClick = () => {
        if (onClickRow)
            onClickRow(jobData);
    };

    useEffect(() => {
        if (['RUNNING', 'SCHEDULED'].indexOf(jobData?.status) >= 0) {
            if (!isAutoRefresh.current) {
                isAutoRefresh.current = true;
            }
        } else if (isAutoRefresh.current) {
            isAutoRefresh.current = false;
        }
    }, [jobData]);

    const onRun = async () => {
        const {job} = await runJob({user, id: jobData.id});

        if (job)
            setJobData({
                ...jobData,
                ...job,
            });
    };

    const onStop = async () => {
        const {job} = await stopJob({user, id: jobData.id});

        if (job)
            setJobData({
                ...jobData,
                ...job,
            });
    };

    const getTitle = () => {
        if (jobData.title && jobData.title.length)
            return jobData.title;
        else
            return <span>New job</span>;
    };

    const renderStatus = () => {
        switch (jobData.status) {
            case ('SCHEDULED'):
                return <div className={css.status}>
                    {t('inProgress')}&#8230;
                </div>;

            case ('RUNNING'):
                return <div className={css.status}>
                    {t('inProgress')}&#8230;

                    <Progress
                        className={css.progress}
                        data={jobData}
                    />
                </div>;

            case ('TIMEOUT'):
                return <div className={cx(css.status, 'fail')}>⛔️ {t('failedDueToTimeout')}</div>;

            case ('FAILED'):
                return <div className={cx(css.status, 'fail')}>⛔️ {t('failed')}</div>;

            case ('FINISHED'):
                return <div className={cx(css.status, 'success')}>✅ {t('completed')}</div>;

            case ('CREATED'):
                return <div className={css.status}>{t('neverRun')}</div>;

            default:
                return <div className={css.status}>{t(jobData.status.toLowerCase())}</div>;
        }
    };

    return (
        <div className={cx(css.row, {red: ['TIMEOUT', 'FAILED'].indexOf(jobData.status) > -1})} onClick={rowClick}>
            <div className={css.cell}>{getTitle()}</div>
            <div className={css.cell}>{t(jobData.runtime)}</div>
            <div className={css.cell}>{moment(jobData.started).format('MM-DD-YYYY [at] HH:mm')}</div>
            <div className={css.cell}>{getFormattedDuration(jobData.finished - jobData.started)}</div>

            <div className={css.cell}>
                {renderStatus()}

                {currentUSer === user && (
                    <Dropdown
                        className={css.dropdown}

                        items={[
                            ...(['RUNNING', 'SCHEDULED', 'STOPPING'].indexOf(jobData.status) >= 0
                                ? [{
                                    title: t('stop'),
                                    onClick: onStop,
                                }]

                                : [{
                                    title: t('run'),
                                    onClick: onRun,
                                }]
                            ),

                            {
                                title: t('edit'),
                                onClick: onEdit,
                            },

                            {
                                title: t('delete'),
                                onClick: onDelete,
                            },
                        ]}
                    />
                )}
            </div>
        </div>
    );
});

export default connect(
    state => ({currentUSer: state.app.userData?.user}),
)(TableRow);