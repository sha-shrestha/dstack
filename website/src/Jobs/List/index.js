// @flow
import React, {useEffect, useState} from 'react';
import {get} from 'lodash-es';
import {connect} from 'react-redux';
import {useHistory, useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import {Button, SearchField, Yield} from '@dstackai/dstack-react';
import TableRow from './components/TableRow';
import Loader from './components/Loader';
import routes from 'routes';
import config from 'config';
import {create as createJob, remove as removeJob} from 'Jobs/Details/actions';
import {fetchList} from './actions';
import css from './styles.module.css';

type Props = {
    loading: boolean,
    search: string,
    currentUser?: string,
    setSearch: Function,
    fetchList: Function,
    createJob: Function,
    removeJob: Function,
}

const List = ({
    currentUser,
    data = [],
    fetchList,
    createJob,
    removeJob,
    loading,
}: Props) => {
    const {t} = useTranslation();
    const [search, setSearch] = useState('');
    const {user} = useParams();
    const {push} = useHistory();

    const onChangeSearch = value => setSearch(value);

    useEffect(() => {
        fetchList(user);
    }, []);

    const getItems = () => {
        let items = [];

        if (data && data.length) {
            if (search.length)
                items = data.filter(i => i.title.indexOf(search) >= 0);
            else
                items = data;
        }

        return items;
    };

    const items = getItems();

    const onAdd = () => {
        const lastRuntime = localStorage.getItem('lastRuntime') || 'python';

        createJob(
            {
                user,
                runtime: lastRuntime,
            },
            ({job}) => push(routes.jobsDetails(user, job.id)),
        );
    };

    const getOnRemove = job => () => {
        removeJob({
            user,
            id: job.id,
        });
    };

    if (loading)
        return <Loader />;

    return (
        <div className={css.list}>
            <Yield name="header-yield">
                <SearchField
                    showEverything
                    isDark
                    placeholder={t('findJob')}
                    size="small"
                    value={search}
                    className={css.search}
                    onChange={onChangeSearch}
                />
            </Yield>

            <div className={css.title}>
                {currentUser === user
                    ? t('myJobs')
                    : t('jobsOf', {name: user})
                }

                <Button
                    className={css.button}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={onAdd}
                >
                    <span className="mdi mdi-plus" /> {t('newJob')}
                </Button>
            </div>

            <div className={css.text}>
                {t('youHaveJobs', {count: data.length})}
                {' '}
                <a href={config.DOCS_URL + '/jobs'} target="_blank">
                    {t('documentation')}
                    <span className="mdi mdi-open-in-new" />
                </a>.
            </div>

            {data && Boolean(data.length) && <SearchField
                placeholder={t('findJob')}
                className={css.mobileSearch}
                showEverything
                size="small"
                value={search}
                onChange={onChangeSearch}
            />}

            <div className={css.tableWrap}>
                <div className={css.table}>
                    <div className={css.tableCaptions}>
                        <div className={css.tableCell}>{t('job')}</div>
                        <div className={css.tableCell}>{t('runtime')}</div>
                        <div className={css.tableCell}>{t('lastRun')}</div>
                        <div className={css.tableCell}>{t('timeSpent')}</div>
                        <div className={css.tableCell}>{t('status')}</div>
                    </div>

                    {items.map(item => (
                        <TableRow
                            data={item}
                            key={item.id}
                            onClickRow={() => push(routes.jobsDetails(user, item.id))}
                            onEdit={() => push(routes.jobsDetails(user, item.id))}
                            onDelete={getOnRemove(item)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default connect(
    state => ({
        currentUser: get(state.app.userData, 'user'),
        data: state.jobs.list.data,
        loading: state.jobs.list.loading,
    }),
    {fetchList, createJob, removeJob}
)(List);