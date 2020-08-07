// @flow
import React, {Fragment, useEffect} from 'react';
import {get} from 'lodash-es';
import {connect} from 'react-redux';
import {useParams, useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {NotFound, DashboardList} from '@dstackai/dstack-react';
import {isSignedIn} from '@dstackai/dstack-react/dist/utils';
import {create as createDashboard, deleteDashboard} from 'Dashboards/Details/actions';
import {fetchList} from './actions';
import routes from 'routes';

type Props = {
    currentUser?: string,
    fetchList: Function,
    data: ?Array<{}>,
    loading: boolean,
    creatingDashboard: boolean,
    createDashboard: Function,
    deleteDashboard: Function,
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
    const {push} = useHistory();
    const {t} = useTranslation();


    useEffect(() => {
        fetchList(user);
    }, [user]);

    const onClickAdd = () => {
        createDashboard(
            user,
            ({dashboard}) => push(routes.dashboardsDetails(user, dashboard.id)),
        );
    };

    if (!loading && requestStatus === 404)
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
        <DashboardList
            addDashboard={onClickAdd}
            addDashboardDisable={creatingDashboard}
            currentUser={currentUser}
            data={data}
            deleteDashboard={deleteDashboard}
            loading={loading}
            user={user}
        />
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

    {fetchList, createDashboard, deleteDashboard}
)(List);