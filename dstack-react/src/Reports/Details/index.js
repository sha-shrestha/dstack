import React, {Fragment, useEffect, useContext, useState} from 'react';
import useSWR from 'swr';
import cn from 'classnames';
import {get, isEqual, unionBy} from 'lodash-es';
import {Link} from 'react-router-dom';
import {useHistory, useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import NotFound from '../../NotFound';
import AccessForbidden from '../../AccessForbidden';
import {useAppStore} from '../../AppStore';
import config from '../../config';
import routes from '../../routes';
import {dataFetcher, isSignedIn, parseStackParams} from '../../utils';
import {useDebounce, useForm} from '../../hooks';
import Loader from './components/Loader';
import Yield from '../../Yield';
import BackButton from '../../BackButton';
import StretchTitleField from '../../StretchTitleField';
import ViewSwitcher from '../../ViewSwitcher';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import DnDGridContext from '../../dnd/DnDGridContext';
import usePrevious from '../../hooks/usePrevious';
import StackFilters from '../../StackFilters';
import useActions from '../actions';
import AddStacksModal from '../AddStacksModal';
import Card from './components/Card';
import DnDItem from '../../dnd/DnDItem';
import css from './styles.module.css';

const dataFormat = data => data.dashboard;

const Details = ({renderHeader, renderSideHeader}) => {
    const {t} = useTranslation();
    const [view, setView] = useState('grid');
    const {user, id} = useParams();
    const {push} = useHistory();
    const {items, moveItem, setItems} = useContext(DnDGridContext);
    const [{currentUser, apiUrl}] = useAppStore();
    const currentUserName = currentUser.data?.user;
    const {deleteReport, updateReport, reportInsertCard, reportDeleteCard, reportUpdateCard} = useActions();
    const [isShowStacksModal, setIsShowStacksModal] = useState(false);
    const {form, setForm, onChange} = useForm({});
    const [fields, setFields] = useState({});
    const setGridItems = cardsItems => setItems(cardsItems.map(card => ({id: card.index, card})));

    const {data, mutate, error} = useSWR(
        [
            apiUrl + config.DASHBOARD_DETAILS(user, id),
            dataFormat,
        ],
        dataFetcher,
    );

    const prevData = usePrevious(data);

    useEffect(() => {
        if (window)
            window.dispatchEvent(new Event('resize'));
    }, [view]);

    useEffect(() => {
        if (data?.cards)
            setGridItems(data?.cards);

        if (!isEqual(prevData, data) && data?.cards)
            parseParams();

        return () => setGridItems([]);
    }, [data]);

    const parseParams = () => {
        const fields = data.cards.reduce((result, card) => {
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

    const update = async (params: {}) => {
        const response = await updateReport(user, id, params);

        mutate({
            ...data,
            ...response.dashboard,
        });
    };

    const onChangeTitle = useDebounce(async title => {
        await update({title});
    }, 300);

    const addStacks = async stacks => {
        const {dashboard} = await reportInsertCard(
            user,
            id,
            stacks.map(stack => ({stack})),
            data?.cards?.length
        );


        mutate(dashboard);
    };

    const getDeleteCardFunc = stack => async () => {
        const {dashboard} = await reportDeleteCard(
            user,
            id,
            stack,
        );

        mutate(dashboard);
    };

    const getUpdatedCardTitleFunc = stack => async title => {
        const {cards} = await reportUpdateCard(
            user,
            id,
            stack,
            {title}
        );

        mutate({
            ...data,
            cards,
        });
    };

    const moveCard = (indexFrom, indexTo) => {
        if (indexTo < 0 || indexFrom < 0)
            return;

        const {stack} = items[indexFrom].card;

        moveItem(indexFrom, indexTo);

        reportUpdateCard(
            user,
            id,
            stack,
            {index: indexTo}
        ).catch(console.log);
    };

    const deleteDashboard = async () => {
        await deleteReport(user, id);
        push(routes.reports(user));
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
                className={cn(css.filters, {'with-select': hasSelectField})}
            />
        );
    };

    const toggleAddStackModal = event => {
        if (event?.target)
            event.preventDefault();

        setIsShowStacksModal(isShow => !isShow);
    };

    if (error?.status === 403)
        return <AccessForbidden>
            {t('youDontHaveAnAccessToThisDashboard')}.

            {isSignedIn() && (
                <Fragment>
                    <br />

                    <Link to={routes.reports(currentUserName)}>
                        {t('goToMyDashboards')}
                    </Link>
                </Fragment>
            )}
        </AccessForbidden>;

    if (error?.status === 404)
        return <NotFound>
            {t('theDashboardYouAreRookingForCouldNotBeFound')}
            {' '}
            {isSignedIn() && (
                <Fragment>
                    <Link to={routes.reports(currentUserName)}>
                        {t('goToMyDashboards')}
                    </Link>.
                </Fragment>
            )}
        </NotFound>;

    if (!data)
        return <Loader />;

    const isUserOwner = currentUserName === user;
    const CardWrapComponent = isUserOwner ? DnDItem : Fragment;

    return (
        <div className={css.details}>
            <Yield name="header-yield">
                <BackButton
                    Component={Link}
                    to={routes.reports(user)}
                >
                    {(currentUserName === user)
                        ? t('backToDashboards')
                        : t('backToDashboardsOf', {name: user})
                    }
                </BackButton>
            </Yield>

            <div className={css.header}>
                <div className={css.title}>
                    <StretchTitleField
                        className={css.edit}
                        value={data?.title}
                        onChange={onChangeTitle}
                        readOnly={currentUserName !== data.user}
                        placeholder={t('newDashboard')}
                    />

                    <span className={`mdi mdi-lock${data.private ? '' : '-open'}`} />
                </div>

                {renderHeader && renderHeader(data)}

                <div className={css.sideHeader}>
                    {renderSideHeader && renderSideHeader(data)}

                    {isUserOwner && <Dropdown
                        className={css.dropdown}

                        items={[
                            {
                                title: t('delete'),
                                onClick: deleteDashboard,
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
            </div>

            {Boolean(items.length) && (
                <Fragment>
                    <div className={css.section}>
                        <div className={css.fields}>
                            {renderFilters()}
                        </div>

                        <div className={css.controls}>
                            {isUserOwner && (
                                <a
                                    className={css.addButton}
                                    onClick={toggleAddStackModal}
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

                    <div className={cn(css.cards, view)}>
                        {items.map(item => (
                            <CardWrapComponent
                                key={item.card.stack}
                                {...(isUserOwner ? {
                                    id: item.id,
                                    onMoveItem: moveCard,
                                } : {})}
                            >
                                <Card
                                    type={view}
                                    filters={form}
                                    deleteCard={isUserOwner && getDeleteCardFunc(item.card.stack)}
                                    data={item.card}
                                    updateCardTitle={isUserOwner && getUpdatedCardTitleFunc(item.card.stack)}
                                    moveAvailable={isUserOwner}
                                />
                            </CardWrapComponent>
                        ))}
                    </div>
                </Fragment>
            )}

            {!items.length && (
                <div className={css.empty}>
                    {t('thereAreNoStacksYet')} <br/>
                    {t('youCanSendStacksYouWantToBeHereLaterOrAddItRightNow')}

                    {isUserOwner && (
                        <Fragment>
                            {' '}

                            <a
                                className={css.addButton}
                                onClick={toggleAddStackModal}
                                href="#"
                            >{t('addStack')}</a>.
                        </Fragment>
                    )}
                </div>
            )}

            <AddStacksModal
                isShow={isShowStacksModal}
                onClose={toggleAddStackModal}
                onAddStacks={addStacks}
            />
        </div>
    );
};

export default Details;
