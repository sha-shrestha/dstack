// @flow

import React, {useState, useEffect, useRef} from 'react';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Button from '../../Button';
import Modal from '../../Modal';
import Dropdown from '../../Dropdown';
import ViewSwitcher from '../../ViewSwitcher';
import SearchField from '../../SearchField';
import StackListItem from '../ListItem';
import Tooltip from '../../Tooltip';
import useListViewSwitcher from '../../hooks/useListViewSwitcher';
import Tabs from '../Details/components/Tabs';
import getStackCategory from '../../utils/getStackCategory';
import routes from '../../routes';
import css from './styles.module.css';

type Stack = {
    [key: string]: any,
} | string;

type Props = {
    deleteStack: Function,
    renderUploadStack?: Function,
    data: Array<Stack>,
    loading: boolean,
    currentUser?: string,
};

const List = ({
    data = [],
    loading,
    deleteStack,
    currentUser,
    user,
    renderUploadStack = () => {},
}: Props) => {
    const {t} = useTranslation();

    const tabsMap = {
        chart: {
            label: t('chart_plural'),
            value: 'chart',
        },

        table: {
            label: t('dataSet_plural'),
            value: 'table',
        },

        mlModel: {
            label: t('mlModel_plural'),
            value: 'mlModel',
        },

        app: {
            label: t('app_plural'),
            value: 'app',
        },
    };

    const [view, setView] = useListViewSwitcher('stack-list');
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [stacksByCategories, setStacksByCategories] = useState({});
    const [deletingStack, setDeletingStack] = useState(null);
    const [isShowWelcomeModal, setIsShowWelcomeModal] = useState(false);
    const [isShowUploadStackModal, setIsShowUploadStackModal] = useState(false);
    const [search, setSearch] = useState('');
    const isInitialMount = useRef(true);
    const [sorting, setSorting] = useState(null);

    const sortingItems = {lastSource: {title: t('lastChanged')}};

    const showWelcomeModal = () => setIsShowWelcomeModal(true);
    const onChangeSearch = value => setSearch(value);

    const hideWelcomeModal = () => {
        localStorage.setItem('welcome-modal-is-showing', true);
        setIsShowWelcomeModal(false);
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (!localStorage.getItem('welcome-modal-is-showing') && !loading && !data.length)
                showWelcomeModal();
        }

        if (data && data.length) {
            const stacksByCategories = {};
            const tabs = [];

            data.forEach(stack => {
                const category = getStackCategory({
                    application: stack.head?.preview?.application,
                    contentType: stack.head?.preview?.content_type,
                });

                if (category && !tabs.find(i => i.value === tabsMap[category].value))
                    tabs.push(tabsMap[category]);

                if (Array.isArray(stacksByCategories[category]))
                    stacksByCategories[category].push(stack);
                else
                    stacksByCategories[category] = [stack];
            });

            setTabs(tabs);
            setStacksByCategories(stacksByCategories);

            if (!activeTab || !tabs.find(i => i.value === tabsMap[activeTab].value))
                setActiveTab(tabs[0].value);
        }
    }, [data]);


    const showUploadStackModal = event => {
        event.preventDefault();
        setIsShowUploadStackModal(true);
    };

    const hideUploadStackModal = () => setIsShowUploadStackModal(false);

    const deleteItem = () => {
        deleteStack(deletingStack);
        hideDeleteConfirmation();
    };

    const showDeleteConfirmation = name => {
        setDeletingStack(name);
    };
    const hideDeleteConfirmation = () => setDeletingStack(null);

    const getItems = () => {
        let filteredItems = [];

        let items = [];

        if (activeTab && stacksByCategories[activeTab])
            items = stacksByCategories[activeTab];
        else
            items = data;

        if (items && items.length) {
            if (search.length)
                filteredItems = items.filter(i => i.name.indexOf(search) >= 0);
            else
                filteredItems = items;
        }

        return filteredItems;
    };

    const items = getItems();

    return (
        <div className={css.list}>
            <div className={css.header}>
                <div className={css.title}>
                    {currentUser === user
                        ? t('stacks')
                        : t('stacksOf', {name: user})
                    }
                </div>

                {Boolean(data.length) && (
                    <div className={css.headerSide}>
                        {Boolean(data.length) && (
                            <SearchField
                                className={css.search}
                                showEverything
                                isDark
                                placeholder={t('findStack')}
                                size="small"
                                value={search}
                                onChange={onChangeSearch}
                            />
                        )}

                        {renderUploadStack && (
                            <Tooltip
                                overlayContent={t('uploadTooltip')}
                            >
                                <Button
                                    className={css.uploadButton}
                                    onClick={showUploadStackModal}
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                >
                                    {t('createStack')}
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                )}
            </div>

            {!(!loading && !Boolean(data.length)) && (
                <div className={css.controls}>
                    <ViewSwitcher
                        className={css.viewSwitcher}
                        value={view}
                        onChange={setView}
                    />

                    {false && (
                        <Dropdown
                            className={css.sorting}
                            items={
                                Object.keys(sortingItems).map(key => ({
                                    title: sortingItems[key].title,
                                    onClick: () => setSorting(key),
                                }))
                            }
                        >
                            <button
                                className={css.sortingButton}
                            >
                                {sorting ? sortingItems[sorting].title : t('sort')}
                                <span className="mdi mdi-chevron-down" />
                            </button>
                        </Dropdown>
                    )}
                </div>
            )}

            {loading && !Boolean(data.length) && (
                <div className={cn(css.itemList, view)}>
                    {new Array(view === 'grid' ? 12 : 8).fill({}).map((i, index) => (
                        <div key={index} className={css.loadingItem} />
                    ))}
                </div>
            )}

            {!loading && !data.length && (
                <div className={css.message}>
                    {user === currentUser
                        ? t('youHaveNoStacksYet')
                        : t('theUserHasNoStacksYetByName', {name: user})
                    }
                </div>
            )}

            {!loading && !Boolean(data.length) && currentUser === user && renderUploadStack && renderUploadStack()}

            {!!tabs.length && (
                <Tabs
                    className={css.tabs}
                    items={tabs}
                    value={activeTab}
                    onChange={tab => setActiveTab(tab)}
                />
            )}

            {Boolean(data.length && items.length) && (
                <div className={cn(css.itemList, view)}>
                    {items.map((item, index) => <StackListItem
                        className={css.item}
                        Component={Link}
                        key={index}
                        data={item}
                        to={routes.stackDetails(item.user, item.name)}
                        deleteAction={currentUser === item.user && showDeleteConfirmation}
                    />)}
                </div>
            )}

            {Boolean(data.length && !items.length) && <div className={css.text}>
                {t('noStacksAreFoundedMatchedTheSearchCriteria')}
            </div>}

            <Modal
                isShow={Boolean(deletingStack)}
                onClose={hideDeleteConfirmation}
                size="confirmation"
                title={t('deleteStack')}
                className={css.modal}
            >
                <div className={css.description}>
                    {t('areYouSureYouWantToDelete', {name: deletingStack})}
                </div>

                <div className={css.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={hideDeleteConfirmation}
                        className={css.button}
                    >{t('cancel')}</Button>

                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={deleteItem}
                        className={css.button}
                    >{t('deleteStack')}</Button>
                </div>
            </Modal>

            {currentUser === user && (
                <Modal
                    isShow={isShowWelcomeModal}
                    onClose={hideWelcomeModal}
                    size="small"
                    title={`${t('welcomeToDStack')}👋`}
                    className={css.modal}
                >
                    <div className={css.description}>{t('yourEmailWasSuccessfullyConfirmed')}</div>

                    <div className={css.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={hideWelcomeModal}
                            className={css.button}
                        >{t('getStarted')}</Button>
                    </div>
                </Modal>
            )}

            {renderUploadStack && <Modal
                isShow={isShowUploadStackModal}
                withCloseButton
                onClose={hideUploadStackModal}
                size="big"
                title={t('howToConnectYourDataWithDStack')}
                className={css.modal}
            >
                {renderUploadStack()}
            </Modal>}
        </div>
    );
};

export default List;
