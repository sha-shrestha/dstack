// @flow
import React, {useState} from 'react';
import {get} from 'lodash-es';
import useSWR from 'swr';
import {connect} from 'react-redux';
import {useHistory, useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import {Button, SearchField, Yield} from '@dstackai/dstack-react';
import {dataFetcher} from '@dstackai/dstack-react/dist/utils';
import TableRow from './components/TableRow';
import Loader from './components/Loader';
import routes from 'routes';
import config from 'config';
// import {create as createJob, remove as removeJob} from 'Jobs/Details/actions';
import {createJob, removeJob} from '../utils';
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

const dataFormat = data => data.jobs;

const List = ({currentUser}: Props) => {
    const {t} = useTranslation();
    const [search, setSearch] = useState('');
    const {user} = useParams();
    const {push} = useHistory();

    const {data, mutate} = useSWR(
        [
            config.API_URL + config.JOB_LIST(user),
            dataFormat,
        ],
        dataFetcher,
    );

    const onChangeSearch = value => setSearch(value);

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

    const onAdd = async () => {
        const lastRuntime = localStorage.getItem('lastRuntime') || 'python';

        const data = await createJob(
            {
                user,
                runtime: lastRuntime,
            }
        );

        push(routes.jobsDetails(user, data.job.id));
    };

    const getOnRemove = job => async () => {
        await removeJob({
            user,
            id: job.id,
        });


        mutate(data.filter(j => j.id !== job.id));
    };

    if (!data)
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
    state => ({currentUser: get(state.app.userData, 'user')}),
)(List);