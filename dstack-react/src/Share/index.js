// @flow
import React, {useState, useEffect, Fragment, useMemo} from 'react';
import {isEqual, get} from 'lodash-es';
import {useTranslation} from 'react-i18next';
import cx from 'classnames';
import useDebounce from '../hooks/useDebounce';
import Copy from '../Copy';
import Modal from '../Modal';
import Avatar from '../Avatar';
import CheckboxField from '../CheckboxField';
import TextField from '../TextField';
import Button from '../Button';
import {isValidEmail} from '../validations';
import {useAppStore} from '../AppStore';
import useActions from './actions';
import css from './styles.module.css';

type Props = {
    className?: string,
    urlParams?: {[key: string]: any},
    update: Function,
    onUpdatePrivate: Function,
    onUpdatePermissions: Function,
    permissions: Array<{}>,
    instancePath: string,
    loading: boolean,
    defaultIsPrivate?: boolean,
    defaultPermissions?: Array<{}>,
};

const Share = ({
    className,
    instancePath,
    defaultIsPrivate = false,
    defaultPermissions = [],
    onUpdatePrivate,
    urlParams = {},
    onUpdatePermissions,
}: Props) => {
    const [{configInfo}] = useAppStore();
    const [userExists, setUserExists] = useState(null);
    const [isEmail, setIsEmail] = useState(false);
    const [isPrivate, setIsPrivate] = useState(defaultIsPrivate);
    const [permissions, setPermissions] = useState(defaultPermissions);
    const [loading, setLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [userName, setUserName] = useState('');
    const {checkUser, addPermissions, removePermissions} = useActions();
    const {t} = useTranslation();
    const toggleModal = () => setIsShowModal(!isShowModal);

    useEffect(() => {
        setPermissions(defaultPermissions);
        setIsPrivate(defaultIsPrivate);
    }, [instancePath]);

    const updatePrivate = useDebounce(isPrivate => {
        if (onUpdatePrivate)
            onUpdatePrivate(isPrivate);
    }, []);

    const checkUserName = useDebounce(userName => {
        setUserExists(null);

        if (userName.length) {
            checkUser(userName)
                .then(data => setUserExists(data.exists))
                .catch(() => setUserExists(null));
        }
    }, []);

    const onChangeIsPrivate = event => {
        setIsPrivate(event.target.checked);
        updatePrivate(event.target.checked);
    };

    const onChangeUserName = event => {
        setUserName(event.target.value);

        if (isValidEmail(event.target.value).isValid && get(configInfo, 'data.email_enabled')) {
            setUserExists(null);
            setIsEmail(true);
        } else {
            checkUserName(event.target.value);

            if (isEmail)
                setIsEmail(false);
        }
    };

    const onKeyPressUserName = event => {
        if (event.which === 13 || event.keyCode === 13 || event.key === 'Enter') {
            if (userName.length) {
                const userHasPermission = permissions.some(i => i.user === userName);

                if (!userHasPermission)
                    addUser(userName);
                else
                    setUserName('');
            }
        }
    };

    const addUser = (userName: string) => {
        setLoading(true);

        addPermissions({
            userName,
            instancePath,
        })
            .then(data => {
                setUserName('');
                setPermissions(permissions => {
                    const newPermissions = permissions.concat([data]);

                    onUpdatePermissions(newPermissions);
                    return newPermissions;
                });
            })
            .finally(() => setLoading(false));
    };

    const removeUser = (user: {
        user?: string,
        email?: string,
    }) => () => {
        removePermissions({
            instancePath,
            user,
        })
            .then(() => {
                setPermissions(permissions => {
                    const newPermissions = permissions.filter(i => !isEqual(i, user));

                    onUpdatePermissions(newPermissions);
                    return newPermissions;
                });
            });
    };

    const renderUser = (user, index) => {
        return (
            <div className={cx(css.user, {disabled: !user.user})} key={index}>
                <Avatar
                    className={css.userPic}
                    name={user.user || user.email}
                />

                <div className={css.userName}>{user.user || user.email}</div>

                <span
                    onClick={removeUser(user)}
                    className={cx(css.userDelete, 'mdi mdi-close')}
                />

                {user.user && (
                    <span className={cx(css.userMessage, css.userMessageSuccess)}>{t('done')}</span>
                )}

                {user.email && (
                    <span className={css.userMessage}>{t('waitingForAcceptance')}</span>
                )}
            </div>
        );
    };

    const searchString = useMemo(() => {
        const searchString = Object
            .keys(urlParams)
            .reduce((result, key) => {
                if (urlParams[key])
                    result.push(`${key}=${urlParams[key]}`);

                return result;
            }, [])
            .join('&');

        if (searchString)
            return `?${searchString}`;
    }, [urlParams]);

    const {origin} = window.location;

    return (
        <Fragment>
            <Button
                className={cx(css.desktopButton, className)}
                color="primary"
                size="small"
                variant="contained"
                onClick={toggleModal}
            >
                {t('share')}
            </Button>

            <Button
                className={cx(css.mobileButton, className)}
                color="primary"
                size="small"
                onClick={toggleModal}
            >
                <span className="mdi mdi-share-variant" />
            </Button>

            {instancePath && <Modal
                isShow={isShowModal}
                onClose={toggleModal}
                size="small"
                title={t('shareStack')}
                className={css.modal}
                dialogClassName={css.dialog}
                withCloseButton
            >
                <div className={css.description}>
                    {isPrivate
                        ? t('theCurrentStackIsPrivateButYouCanMakeItPublic')
                        : t('theCurrentStackIsPublicButYouCanMakeItPrivateAndShareWithSelectedUsersOnly')
                    }
                </div>

                <div className={css.copylink}>
                    <TextField
                        className={css.textInput}
                        readOnly
                        value={`${origin}/${instancePath}${searchString}`}
                    />

                    <Copy
                        className={css.copy}
                        copyText={`${origin}/${instancePath}${searchString}`}
                        successMessage={t('linkIsCopied')}
                    />
                </div>

                <div className={css.content}>
                    <CheckboxField
                        className={css.switcher}
                        id="checkbox-is-private"
                        name="private"
                        appearance="switcher"
                        onChange={onChangeIsPrivate}
                        value={isPrivate}
                        offLabel={t('everyoneWithTheLink')}
                        onLabel={t('selectedUsersOnly')}
                    />

                    {isPrivate && <div className={css.checkUserName}>
                        <TextField
                            disabled={loading}
                            placeholder={get(configInfo, 'data.email_enabled')
                                ? t('enterUsernameEmailAndPressEnter')
                                : t('enterUsernameAndPressEnter')
                            }
                            className={css.textInput}
                            value={userName}
                            onChange={onChangeUserName}
                            onKeyPress={onKeyPressUserName}
                        />

                        {Boolean(userName.length) && !loading && <div
                            className={cx(css.checkUserMessage, {
                                success: userExists,
                                fail: userExists === false,
                                secondary: isEmail,
                            })}
                        >
                            {userExists && !isEmail && t('userExists')}
                            {!userExists && !isEmail && t('userNotFound')}
                            {isEmail && t('enterToInvite')}
                        </div>}
                    </div>}

                    {isPrivate && <div className={css.users}>
                        {permissions.map(renderUser)}
                    </div>}
                </div>
            </Modal>}
        </Fragment>
    );
};

export default Share;
