// @flow
import React, {useRef} from 'react';
import {connect} from 'react-redux';
import {get} from 'lodash-es';
import {useParams, Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import routes from 'routes';
import {Dropdown, StackAttachment} from '@dstackai/dstack-react';
import {deleteDashboard} from 'Dashboards/Details/actions';
import type {Dashboard} from 'Dashboards/types';
import css from './styles.module.css';

type Props = {
    dashboard: Dashboard,
    userData: ?{user: string},
    deleteDashboard: Function,

    attachment: {
        error: any
    },
}

const Item = ({dashboard, userData, deleteDashboard}: Props) => {
    const params = useParams();
    const {t} = useTranslation();
    const ref = useRef(null);

    const hasStacks = dashboard.cards && Boolean(dashboard.cards.length);
    const card = dashboard.cards.find(c => get(c, 'head.id'));

    const onClickDelete = () => {
        deleteDashboard({
            user: params.user,
            id: dashboard.id,
        });
    };

    return (
        <Link
            to={routes.dashboardsDetails(params.user, dashboard.id)}
            className={css.item}
            ref={ref}
        >
            {Boolean(dashboard.cards.length) && (
                <div className={css.label}>
                    {t('stacksWithCount', {count: dashboard.cards.length})}
                </div>
            )}

            <div className={css.previewWrap}>
                {hasStacks
                    ? <StackAttachment
                        className={css.attachment}
                        isList
                        withLoader
                        frameId={card.head.id}
                        stack={card.stack}
                        id={0}
                    />

                    : <div className={css.emptyMessage}>{t('emptyDashboard')}</div>
                }
            </div>

            <div className={css.section}>
                <div className={css.content}>
                    <div className={css.name}>
                        {dashboard.title}
                        {' '}
                        <span className={`mdi mdi-lock${dashboard.private ? '' : '-open'}`} />
                    </div>

                    {params.user !== dashboard.user && (
                        <div className={css.by}>{t('by')} {dashboard.user}</div>
                    )}
                </div>

                {get(userData, 'user') === dashboard.user && <Dropdown
                    className={css.dropdown}

                    items={[
                        {
                            title: t('delete'),
                            onClick: onClickDelete,
                        },
                    ]}
                />}
            </div>

        </Link>
    );
};

export default connect(
    state => ({userData: state.app.userData}),
    {deleteDashboard}
)(Item);