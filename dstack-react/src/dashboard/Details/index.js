// @flow
import React, {Fragment, useEffect, useRef, useState, useContext, useCallback} from 'react';
import cx from 'classnames';
import {useTranslation} from 'react-i18next';
import {get, isEqual, unionBy, debounce as _debounce} from 'lodash-es';
import {Link} from 'react-router-dom';
import Button from '../../Button';
import Dropdown from '../../Dropdown';
import ViewSwitcher from '../../ViewSwitcher';
import StretchTitleField from '../../StretchTitleField';
import Yield from '../../Yield';
import BackButton from '../../BackButton';
import StackFilters from '../../StackFilters';
import DnDGridContext from '../../dnd/DnDGridContext';
import DnDItem from '../../dnd/DnDItem';
import Loader from './components/Loader';
import Card from './components/Card';
import {parseStackParams} from '../../utils';
import useForm from '../../hooks/useForm';
import usePrevious from '../../hooks/usePrevious';
import type {Dashboard} from '../types';
import css from './styles.module.css';

type Props = {
    addCards?: Function,
    backUrl: string,
    cards?: Array<{}>,
    currentUser?: string,
    data?: Dashboard,
    deleteCard: Function,
    deleteDashboard: Function,
    loading: boolean,
    onChangeTitle?: Function,
    updateCard?: Function,
    user: string,
    withSorting?: boolean,
}

const Details = ({
    addCards,
    backUrl,
    cards,
    currentUser,
    data,
    deleteCard,
    deleteDashboard,
    loading,
    onChangeTitle = () => {},
    updateCard,
    user,
    withSorting,
}: Props) => {
    const {items, moveItem, setItems} = useContext(DnDGridContext);

    const {t} = useTranslation();
    const [view, setView] = useState('grid');
    const {form, setForm, onChange} = useForm({});
    const [fields, setFields] = useState({});
    const prevData = usePrevious(data);
    const isDidMount = useRef(true);
    const onChangeTitleDebounce = useCallback(_debounce(onChangeTitle, 300), []);

    const setGridItems = cardsItems => setItems(cardsItems.map(card => ({id: card.index, card})));

    useEffect(() => {
        if (window)
            window.dispatchEvent(new Event('resize'));
    }, [view]);

    useEffect(() => {
        if (cards)
            setGridItems(cards);

        return () => setGridItems([]);
    }, [cards]);


    useEffect(() => {
        if ((!isEqual(prevData, data) || isDidMount.current) && data)
            parseParams();

        if (isDidMount.current)
            isDidMount.current = false;
    }, [data]);

    const moveCard = (indexFrom, indexTo) => {
        if (indexTo < 0 || indexFrom < 0)
            return;

        const {stack} = items[indexFrom].card;

        if (updateCard)
            updateCard({
                stack,
                index: indexTo,
            });

        moveItem(indexFrom, indexTo);
    };

    const getDeleteCardAction = stack => {
        if (deleteCard) {
            return () => {
                deleteCard(stack);
            };
        }
    };

    const getUpdateCardTitleAction = stack => {
        if (updateCard)
            return title => {
                updateCard({
                    stack,
                    title,
                });
            };
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

    const getAddClickAction = () => {
        if (addCards)
            return event => {
                event.preventDefault();
                addCards();
            };
    };

    if (loading)
        return <Loader />;

    if (!data)
        return null;

    const CardWrapComponent = withSorting ? DnDItem : Fragment;

    return (
        <div className={css.details}>
            <Yield name="header-yield">
                <BackButton
                    Component={Link}
                    to={backUrl}
                >
                    {(currentUser === user)
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
                        onChange={onChangeTitleDebounce}
                        readOnly={currentUser !== data.user}
                        placeholder={t('newDashboard')}
                    />

                    <span className={`mdi mdi-lock${data.private ? '' : '-open'}`} />
                </div>

                {Boolean(deleteDashboard) && <Dropdown
                    className={css.dropdown}

                    items={[
                        ...(Boolean(deleteDashboard) ? [{
                            title: t('delete'),
                            onClick: deleteDashboard,
                        }] : []),
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
                            {getAddClickAction() && (
                                <a
                                    className={css.addButton}
                                    onClick={getAddClickAction()}
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
                            <CardWrapComponent
                                key={item.card.stack}
                                {...(withSorting ? {
                                    id: item.id,
                                    onMoveItem: moveCard,
                                } : {})}
                            >
                                <Card
                                    filters={form}
                                    deleteCard={getDeleteCardAction(item.card.stack)}
                                    data={item.card}
                                    type={view}
                                    updateCardTitle={getUpdateCardTitleAction(item.card.stack)}
                                    moveAvailable={withSorting}
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

                    {getAddClickAction() && (
                        <Fragment>
                            {' '}

                            <a
                                className={css.addButton}
                                onClick={getAddClickAction()}
                                href="#"
                            >{t('addStack')}</a>.
                        </Fragment>
                    )}
                </div>
            )}
        </div>
    );
};

export default Details;
