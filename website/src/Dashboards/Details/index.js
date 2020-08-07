// @flow
import React, {Fragment, useCallback, useEffect, useRef, useState, useContext} from 'react';
import cx from 'classnames';
import {useTranslation} from 'react-i18next';
import {debounce as _debounce, get, isEqual, unionBy} from 'lodash-es';
import {useHistory, useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import DnDGridContext from 'components/DnDGridContext';
import DnDItem from 'components/DnDGridContext/components/DnDItem';
import {Button, Dropdown, ViewSwitcher, AccessForbidden, StretchTitleField,
    NotFound, Yield, BackButton, StackFilters, DashboardAddStacksModal} from '@dstackai/dstack-react';
import Loader from './components/Loader';
import Card from './components/Card';
import routes from 'routes';
import {isSignedIn, parseStackParams} from 'utils';
import {useForm, usePrevious} from 'hooks';
import type {Dashboard} from 'Dashboards/types';
import {fetchList as fetchStackList} from 'Stacks/List/actions';
import {deleteDashboard, fetch, update, insertCard, deleteCard, updateCard} from './actions';
import css from './styles.module.css';

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
    const {items, moveItem, setItems} = useContext(DnDGridContext);

    const {t} = useTranslation();
    const [isShowStacksModal, setIsShowStacksModal] = useState(false);
    const [titleValue, setTitleValue] = useState(data ? data.title : '');
    const [view, setView] = useState('grid');
    const {form, setForm, onChange} = useForm({});
    const [fields, setFields] = useState({});
    const prevData = usePrevious(data);
    const params = useParams();
    const {push} = useHistory();
    const isDidMount = useRef(true);
    const updateDebounce = useCallback(_debounce(update, 300), []);
    const cards = data?.cards;

    const setGridItems = cardsItems => setItems(cardsItems.map(card => ({id: card.index, card})));

    useEffect(() => {
        if (isShowStacksModal)
            fetchStackList(params.user);
    }, [isShowStacksModal]);

    useEffect(() => {
        if (!data || data.id !== params.id)
            fetch(params.user, params.id);
        else
            setGridItems(cards);
    }, []);

    useEffect(() => {
        if (window)
            window.dispatchEvent(new Event('resize'));
    }, [view]);

    useEffect(() => {
        if (cards && !isEqual(prevData, data))
            setGridItems(cards);

        return () => setGridItems([]);
    }, [cards]);


    useEffect(() => {
        if (!prevData && data || (prevData && data && prevData.id !== data.id))
            setTitleValue(data.title);

        if ((!isEqual(prevData, data) || isDidMount.current) && data)
            parseParams();

        if (isDidMount.current)
            isDidMount.current = false;
    }, [data]);

    const onChangeTitle = event => {
        setTitleValue(event.target.value);

        updateDebounce({
            user: params.user,
            id: data.id,
            title: event.target.value,
        });
    };

    const moveCard = (indexFrom, indexTo) => {
        if (indexTo < 0 || indexFrom < 0)
            return;

        const {stack} = items[indexFrom].card;

        updateCard({
            user: params.user,
            dashboard: data.id,
            stack,
            index: indexTo,
        });

        moveItem(indexFrom, indexTo);
    };

    const onClickAdd = event => {
        event.preventDefault();
        setIsShowStacksModal(true);
    };

    const closeModal = () => setIsShowStacksModal(false);

    const onClickDelete = () => {
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

    const getDeleteCardAction = stack => () => {
        deleteCard({
            user: params.user,
            dashboard: data.id,
            stack,
        });
    };

    const getUpdateCardAction = stack => fields => {
        updateCard({
            user: params.user,
            dashboard: data.id,
            stack,
            ...fields,
        });
    };

    const addStacksToDashboard = stacks => {
        insertCard({
            user: params.user,
            dashboard: params.id,
            cards: stacks.map(stack => ({stack})),
            index: cards.length,
        });
    };

    const parseParams = () => {
        if (!cards)
            return;

        const fields = cards.reduce((result, card) => {
            const cardFields = parseStackParams(get(card, 'head.attachments', [])) || {};

            Object.keys(cardFields).forEach(fieldName => {
                if (result[fieldName]) {
                    if (cardFields[fieldName].type === 'select') {
                        result[fieldName].options = unionBy(
                            result[fieldName].options,
                            cardFields[fieldName].options, 'value');
                    }

                    if (cardFields[fieldName].type === 'slider') {

                        result[fieldName].options = {
                            ...result[fieldName].options,
                            ...cardFields[fieldName].options,
                        };

                        result[fieldName].min = Math.min(result[fieldName].min, cardFields[fieldName].min);
                        result[fieldName].max = Math.max(result[fieldName].max, cardFields[fieldName].max);
                    }
                } else {
                    result[fieldName] = cardFields[fieldName];
                }
            });

            return result;
        }, {});

        const defaultFilterValues = Object.keys(fields).reduce((result, fieldName) => {
            if (fields[fieldName].type === 'select')
                result[fieldName] = fields[fieldName].options[0].value;

            if (fields[fieldName].type === 'slider')
                result[fieldName] = fields[fieldName].options[0];

            if (fields[fieldName].type === 'checkbox')
                result[fieldName] = false;

            return result;
        }, {});

        setForm(defaultFilterValues);
        setFields(fields);
    };

    const renderFilters = () => {
        if (!Object.keys(fields).length)
            return null;

        const hasSelectField = Object.keys(fields).some(key => fields[key].type === 'select');

        return (
            <StackFilters
                fields={fields}
                form={form}
                onChange={onChange}
                className={cx(css.filters, {'with-select': hasSelectField})}
            />
        );
    };

    if (loading)
        return <Loader />;

    if (requestStatus === 403)
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

    if (!data)
        return null;

    return (
        <div className={css.details}>
            <Yield name="header-yield">
                <BackButton
                    Component={Link}
                    to={routes.dashboards(params.user)}
                >
                    {(currentUser === params.user)
                        ? t('backToDashboards')
                        : t('backToDashboardsOf', {name: params.user})
                    }
                </BackButton>
            </Yield>

            <div className={css.header}>
                <div className={css.title}>
                    <StretchTitleField
                        className={css.edit}
                        value={titleValue}
                        onChange={onChangeTitle}
                        readOnly={currentUser !== data.user}
                        placeholder={t('newDashboard')}
                    />

                    <span className={`mdi mdi-lock${data.private ? '' : '-open'}`} />
                </div>

                {currentUser === data.user && <Dropdown
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

            {Boolean(items.length) && (
                <Fragment>
                    <div className={css.section}>
                        <div className={css.fields}>
                            {renderFilters()}
                        </div>

                        <div className={css.controls}>
                            {currentUser === data.user && (
                                <a
                                    className={css.addButton}
                                    onClick={onClickAdd}
                                    href="#"
                                >
                                    <span className="mdi mdi-plus" />
                                    {t('addStack')}
                                </a>
                            )}

                            <ViewSwitcher
                                value={view}
                                className={css.viewSwitcher}
                                onChange={view => setView(view)}
                            />
                        </div>
                    </div>

                    <div className={cx(css.cards, view)}>
                        {items.map(item => (
                            currentUser === data.user
                                ? <DnDItem
                                    id={item.id}
                                    key={item.card.stack}
                                    onMoveItem={moveCard}
                                >
                                    <Card
                                        filters={form}
                                        deleteCard={getDeleteCardAction(item.card.stack)}
                                        data={item.card}
                                        type={view}
                                        updateCard={getUpdateCardAction(item.card.stack)}
                                    />
                                </DnDItem>

                                : <Card
                                    key={item.card.stack}
                                    filters={form}
                                    data={item.card}
                                    type={view}
                                />
                        ))}
                    </div>
                </Fragment>
            )}

            {!items.length && (
                <div className={css.empty}>
                    {t('thereAreNoStacksYet')} <br/>
                    {t('youCanSendStacksYouWantToBeHereLaterOrAddItRightNow')}

                    {currentUser === data.user && (
                        <Fragment>
                            {' '}

                            <a
                                className={css.addButton}
                                onClick={onClickAdd}
                                href="#"
                            >{t('addStack')}</a>.
                        </Fragment>
                    )}
                </div>
            )}

            {isShowStacksModal && <DashboardAddStacksModal
                isShow={isShowStacksModal}
                currentUser={currentUser}
                onClose={closeModal}
                onAddStacks={addStacksToDashboard}
                user={params.user}
                stacks={stacks}
                loading={stacksLoading}
            />}
        </div>
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