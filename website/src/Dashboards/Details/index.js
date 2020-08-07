// @flow
import React, {Fragment, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory, useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {AccessForbidden, NotFound, DashboardAddStacksModal, DashboardDetails} from '@dstackai/dstack-react';
import {isSignedIn} from '@dstackai/dstack-react/dist/utils';
import routes from 'routes';
import type {Dashboard} from 'Dashboards/types';
import {fetchList as fetchStackList} from 'Stacks/List/actions';
import {deleteDashboard, fetch, update, insertCard, deleteCard, updateCard} from './actions';

type Props = {
    data?: Dashboard,
    fetch: Function,
    update: Function,
    deleteDashboard: Function,
    insertCard: Function,
    fetchStackList: Function,
    currentUser?: string,
    loading: boolean,
    stacks?: Array<{}>,
    stacksLoading?: boolean,
}

const Details = ({
    data,
    fetch,
    update,
    currentUser,
    deleteDashboard,
    insertCard,
    deleteCard,
    updateCard,
    requestStatus,
    fetchStackList,
    loading,
    stacks,
    stacksLoading,
}: Props) => {
    const {t} = useTranslation();
    const [isShowStacksModal, setIsShowStacksModal] = useState(false);
    const params = useParams();
    const {push} = useHistory();


    useEffect(() => {
        if (isShowStacksModal)
            fetchStackList(params.user);
    }, [isShowStacksModal]);

    useEffect(() => {
        if (!data || data.id !== params.id)
            fetch(params.user, params.id);
    }, []);

    const onChangeTitle = title => {
        update({
            user: params.user,
            id: data.id,
            title,
        });
    };

    const updateCardAction = fields => {
        updateCard({
            user: params.user,
            dashboard: params.id,
            ...fields,
        });
    };

    const showAddCardsModal = () => {
        setIsShowStacksModal(true);
    };

    const closeAddCardsModal = () => setIsShowStacksModal(false);

    const deleteDashboardAction = () => {
        deleteDashboard(
            {
                user: params.user,
                id: data.id,
            },

            () => {
                push(routes.dashboards(params.user));
            }
        );
    };

    const deleteCardAction = stack => {
        deleteCard({
            user: params.user,
            dashboard: data.id,
            stack,
        });
    };

    const addStacksToDashboard = stacks => {
        insertCard({
            user: params.user,
            dashboard: params.id,
            cards: stacks.map(stack => ({stack})),
            index: data?.cards?.length || 0,
        });
    };

    if (!loading && requestStatus === 403)
        return <AccessForbidden>
            {t('youDontHaveAnAccessToThisDashboard')}.

            {isSignedIn() && (
                <Fragment>
                    <br />

                    <Link to={routes.dashboards(currentUser)}>
                        {t('goToMyDashboards')}
                    </Link>
                </Fragment>
            )}
        </AccessForbidden>;

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
        <Fragment>
            <DashboardDetails
                backUrl={routes.dashboards(params.user)}
                cards={data?.cards}
                currentUser={currentUser}
                data={data}
                loading={loading}
                user={params.user}
                {... (currentUser === params.user ? {
                    addCards: showAddCardsModal,
                    onChangeTitle,
                    deleteCard: deleteCardAction,
                    deleteDashboard: deleteDashboardAction,
                    updateCard: updateCardAction,
                    withSorting: true,
                } : {})}
            />

            {isShowStacksModal && <DashboardAddStacksModal
                isShow={isShowStacksModal}
                currentUser={currentUser}
                onClose={closeAddCardsModal}
                onAddStacks={addStacksToDashboard}
                user={params.user}
                stacks={stacks}
                loading={stacksLoading}
            />}
        </Fragment>
    );
};

export default connect(
    state => ({
        currentUser: state.app.userData?.user,
        data: state.dashboards.details.data,
        loading: state.dashboards.details.loading,
        requestStatus: state.dashboards.details.requestStatus,
        stacks: state.stacks.list.data,
        stacksLoading: state.stacks.list.loading,
    }),
    {fetch, update, deleteDashboard, insertCard, deleteCard, updateCard, fetchStackList}
)(Details);