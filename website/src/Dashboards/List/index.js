// @flow
import React, {Fragment, useState, useEffect} from 'react';
import cx from 'classnames';
import {get} from 'lodash-es';
import {connect} from 'react-redux';
import {useParams, useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {SearchField, NotFound} from 'dstack-react';
import Item from './Item';
import Loader from './components/Loader';
import {isSignedIn} from 'utils';
import Yield from 'dstack-react/src/Yield';
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
    createDashboard: Function,
    requestStatus: ?number,
}

const List = ({
    currentUser,
    createDashboard,
    creatingDashboard,
    fetchList,
    data,
    loading,
    requestStatus,
}: Props) => {
    const {user} = useParams();
    const [search, setSearch] = useState('');
    const {push} = useHistory();
    const {t} = useTranslation();

    const onChangeSearch = value => setSearch(value);

    useEffect(() => {
        fetchList(user);
    }, [user]);

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
            <Yield name="header-yield">
                <SearchField
                    showEverything
                    isDark
                    className={css.search}
                    placeholder={t('findDashboard')}
                    size="small"
                    value={search}
                    onChange={onChangeSearch}
                />
            </Yield>

            <div className={css.title}>
                {currentUser === user
                    ? t('myDashboards')
                    : t('dashboardsOf', {name: user})
                }

                {data && Boolean(data.length) && <span>{data.length}</span>}
            </div>

            {data && Boolean(data.length) && <SearchField
                placeholder={t('search')}
                className={css.mobileSearch}
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
        currentUser: get(state.app.userData, 'user'),
        data: state.dashboards.list.data,
        loading: state.dashboards.list.loading,
        requestStatus: state.dashboards.list.requestStatus,
        creatingDashboard: state.dashboards.details.creating,
    }),

    {fetchList, createDashboard}
)(List);