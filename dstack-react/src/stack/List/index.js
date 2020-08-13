// @flow

import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Button from '../../Button';
import Loader from '../../Loader';
import Modal from '../../Modal';
import SearchField from '../../SearchField';
import Yield from '../../Yield';
import StackListItem from '../ListItem';
import StackHowTo from '../HowTo';
import css from './styles.module.css';

type Stack = {
    [key: string]: any,
} | string;

type Props = {
    deleteStack: Function,
    renderSideTitle?: Function,
    data: Array<Stack>,
    loading: boolean,
    currentUser?: string,
    currentUserToken?: string,
    renderItemContent: Function,
};

const List = ({
    data = [],
    loading,
    deleteStack,
    currentUser,
    user,
    currentUserToken,
    renderSideTitle,
    renderItemContent,
}: Props) => {
    const {t} = useTranslation();
    const [deletingStack, setDeletingStack] = useState(null);
    const [isShowWelcomeModal, setIsShowWelcomeModal] = useState(false);
    const [isShowHowToModal, setIsShowHowToModal] = useState(false);
    const [search, setSearch] = useState('');
    const isInitialMount = useRef(true);

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
    }, [data]);


    const showHowToModal = event => {
        event.preventDefault();
        setIsShowHowToModal(true);
    };

    const hideHowToModal = () => setIsShowHowToModal(false);

    const deleteItem = () => {
        deleteStack(deletingStack);
        hideDeleteConfirmation();
    };

    const showDeleteConfirmation = name => setDeletingStack(name);
    const hideDeleteConfirmation = () => setDeletingStack(null);

    const getItems = () => {
        let items = [];

        if (data && data.length) {
            if (search.length)
                items = data.filter(i => i.name.indexOf(search) >= 0);
            else
                items = data;
        }

        return items;
    };

    const items = getItems();

    return (
        <div className={css.list}>
            <Yield name="header-yield">
                <SearchField
                    showEverything
                    isDark
                    className={css.search}
                    placeholder={t('findStack')}
                    size="small"
                    value={search}
                    onChange={onChangeSearch}
                />
            </Yield>

            <div className={css.title}>
                {currentUser === user
                    ? t('stacks')
                    : t('stacksOf', {name: user})
                }

                <div className={css.side}>
                    {renderSideTitle && renderSideTitle()}
                </div>
            </div>

            {loading && !Boolean(data.length) && <Loader />}

            {!loading && !data.length && (
                <div className={css.message}>
                    {user === currentUser
                        ? t('youHaveNoStacksYet')
                        : t('theUserHasNoStacksYetByName', {name: user})
                    }
                </div>
            )}

            {!loading && !Boolean(data.length) && currentUser === user && (
                <StackHowTo
                    user={currentUser}
                    token={currentUserToken}
                />
            )}

            {Boolean(data.length && items.length) && currentUser === user && (
                <div className={css.text}>
                    {t('youHaveStacks', {count: data.length})}
                    {' '}
                    <a href="#" onClick={showHowToModal}>{t('seeHowToGuide')}</a>.
                </div>
            )}

            {Boolean(data.length) && <SearchField
                placeholder={t('search')}
                className={css.mobileSearch}
                showEverything
                size="small"
                value={search}
                onChange={onChangeSearch}
            />}

            {Boolean(data.length && items.length) && <div className={css.grid}>
                {items.map((item, index) => <StackListItem
                    Component={Link}
                    key={index}
                    data={item}
                    otherOwner={user !== item.user}
                    to={`/${item.user}/${item.name}`}
                    deleteAction={currentUser === item.user &&  showDeleteConfirmation}
                    renderContent={renderItemContent}
                />)}
            </div>}

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

            <Modal
                isShow={isShowHowToModal}
                withCloseButton
                onClose={hideHowToModal}
                size="big"
                title={t('howToConnectYourDataWithDStack')}
                className={css.modal}
            >
                <StackHowTo user={currentUser} token={currentUserToken} modalMode />
            </Modal>
        </div>
    );
};

export default List;
