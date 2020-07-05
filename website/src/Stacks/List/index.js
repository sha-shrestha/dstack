// @flow

import React, {useState, useEffect, useRef, Fragment} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {useTranslation} from 'react-i18next';
import HowTo from 'Stacks/components/HowTo';
import {Button, Loader, Modal, SearchField, NotFound} from 'dstack-react';
import Item from './Item';
import css from './styles.module.css';
import {setSearch, setSearchPlaceholder, startAppProgress, completeAppProgress, resetAppProgress} from 'App/actions';
import {fetchList, deleteStack} from './actions';
import Upload from 'Stacks/components/Upload';
import {isSignedIn} from 'utils';
import {Link} from 'react-router-dom';
import routes from 'routes';

type Stack = {
    [key: string]: any,
} | string;

type Props = {
    data: Array<Stack>,
    loading: boolean,
    fetchList: Function,
    deleteStack: Function,
    search: string,
    setSearch: Function,
    requestStatus: ?number,
    currentUser?: string,
    startAppProgress: Function,
    completeAppProgress: Function,
    resetAppProgress: Function,

    match: {
        params: {
            user: string,
        }
    }
};

const List = ({
    requestStatus,
    setSearch,
    fetchList,
    data = [],
    loading,
    deleteStack,
    search,
    setSearchPlaceholder,
    match: {params: {user}},
    currentUser,
    startAppProgress,
    completeAppProgress,
    resetAppProgress,
}: Props) => {
    const {t} = useTranslation();
    const [deletingStack, setDeletingStack] = useState(null);
    const [isShowWelcomeModal, setIsShowWelcomeModal] = useState(false);
    const [isShowHowToModal, setIsShowHowToModal] = useState(false);
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

    const fetchData = () => {
        startAppProgress();
        fetchList(user, completeAppProgress);
    };

    useEffect(() => {
        fetchData();

        return () => {
            resetAppProgress();
        };
    }, [user]);

    useEffect(() => {
        setSearchPlaceholder(t('findStack'));
        return () => setSearchPlaceholder(null);
    }, []);

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

    if (requestStatus === 404)
        return <NotFound>
            {t('theStackYouAreRookingForCouldNotBeFound')}
            {' '}
            {isSignedIn() && (
                <Fragment>
                    <Link to={routes.stacks(currentUser)}>
                        {t('goToMyStacks')}
                    </Link>.
                </Fragment>
            )}
        </NotFound>;

    return (
        <div className={css.list}>
            <Helmet>
                <title>dstack.ai | {user}</title>
            </Helmet>

            <div className={css.title}>
                {currentUser === user
                    ? t('stacks')
                    : t('stacksOf', {name: user})
                }

                {currentUser === user && (
                    <Upload
                        withButton
                        className={css.upload}
                        refresh={fetchData}
                    />
                )}
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
                <HowTo />
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
                className={css.search}
                showEverything
                size="small"
                value={search}
                onChange={onChangeSearch}
            />}

            {Boolean(data.length && items.length) && <div className={css.grid}>
                {items.map((item, index) => <Item
                    withLink
                    key={index}
                    data={item}
                    deleteAction={showDeleteConfirmation}
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
                <HowTo modalMode />
            </Modal>
        </div>
    );
};

export default connect(
    state => ({
        search: state.app.search,
        data: state.stacks.list.data,
        requestStatus: state.stacks.list.requestStatus,
        loading: state.stacks.list.loading,
        currentUser: state.app.userData?.user,
    }),

    {
        setSearch,
        fetchList,
        deleteStack,
        setSearchPlaceholder,
        startAppProgress,
        completeAppProgress,
        resetAppProgress,
    },
)(List);
