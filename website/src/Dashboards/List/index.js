// @flow
import React, {Fragment, useEffect} from 'react';
import cx from 'classnames';
import {get} from 'lodash-es';
import {connect} from 'react-redux';
import {useParams, useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import SearchField from 'components/SearchField';
import NotFound from 'components/NotFound';
import Item from './Item';
import Loader from './components/Loader';
import {isSignedIn} from 'utils';
import {setSearch, setSearchPlaceholder} from 'App/actions';
import {create as createDashboard} from 'Dashboards/Details/actions';
import {fetchList} from './actions';
import routes from 'routes';
import css from './styles.module.css';

type Props = {
    currentUser?: string,
    fetchList: Function,
    data: ?Array<{}>,
    loading: boolean,
    creatingDashboard: boolean,
    setSearch: Function,
    setSearchPlaceholder: Function,
    createDashboard: Function,
    search: string,
    requestStatus: ?number,
}

const List = ({
    currentUser,
    createDashboard,
    creatingDashboard,
    fetchList,
    setSearch,
    setSearchPlaceholder,
    data,
    search,
    loading,
    requestStatus,
}: Props) => {
    const {user} = useParams();
    const {push} = useHistory();
    const {t} = useTranslation();

    const onChangeSearch = value => setSearch(value);

    useEffect(() => {
        fetchList(user);
    }, [user]);

    useEffect(() => {
        setSearchPlaceholder(t('findDashboard'));
        return () => setSearchPlaceholder(null);
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

    const onClickAdd = () => {
        createDashboard(
            user,
            ({dashboard}) => push(routes.dashboardsDetails(user, dashboard.id)),
        );
    };

    const items = getItems();

    if (loading)
        return <Loader />;

    if (requestStatus === 404)
        return <NotFound>
            {t('theDashboardYouAreRookingForCouldNotBeFound')}
            {' '}
            {isSignedIn() && (
                <Fragment>
                    <Link to={routes.dashboards(currentUser)}>
                        {t('goToMyDashboards')}
                    </Link>.
                </Fragment>
            )}
        </NotFound>;

    return (
        <div className={css.list}>
            <div className={css.title}>
                {currentUser === user
                    ? t('myDashboards')
                    : t('dashboardsOf', {name: user})
                }

                {data && Boolean(data.length) && <span>{data.length}</span>}
            </div>

            {data && Boolean(data.length) && <SearchField
                placeholder={t('search')}
                className={css.search}
                showEverything
                size="small"
                value={search}
                onChange={onChangeSearch}
            />}

            <div className={css.grid}>
                {currentUser === user && (
                    <div
                        onClick={onClickAdd}
                        className={cx(css.add, {disabled: creatingDashboard})}
                    >
                        <div className={css.caption}>
                            <span className="mdi mdi-plus" />
                            {t('newDashboard')}
                        </div>
                    </div>
                )}

                {items.map((item, index) => (
                    <Item key={index} dashboard={item} />
                ))}
            </div>
        </div>
    );
};

export default connect(
    state => ({
        search: state.app.search,
        currentUser: get(state.app.userData, 'user'),
        data: state.dashboards.list.data,
        loading: state.dashboards.list.loading,
        requestStatus: state.dashboards.list.requestStatus,
        creatingDashboard: state.dashboards.details.creating,
    }),

    {fetchList, setSearch, setSearchPlaceholder, createDashboard}
)(List);