// @flow

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {debounce as _debounce} from 'lodash-es';
import {Button, TextField, Copy, SettingsInformation, UploadStack} from '@dstackai/dstack-react';
import {updateToken} from 'App/actions';
import {updateSettings} from './actions';
import config from 'config';
import css from './styles.module.css';

type Props = {
    updateToken: Function,
    updateSettings: Function,

    currentUser: string,
    currentUserToken: string,

    history: {push: Function}
}

const Settings = ({updateToken, currentUser, currentUserToken, updateSettings}: Props) => {
    const {t} = useTranslation();
    const availableSendingSettings = useRef(false);
    const [isEditName, setIsEditName] = useState(false);
    const updateSettingsDebounce = useCallback(_debounce(updateSettings, 300), []);

    const [form, setForm] = useState({});

    useEffect(() => {
        setForm({...form});
    }, [currentUser]);

    useEffect(() => {
        if (availableSendingSettings.current)
            updateSettingsDebounce({
                user: currentUser,
                general: {},
            });
        else
            availableSendingSettings.current = true;
    }, [form.comments]);

    const cancelEditName = () => {
        setForm({
            ...form,
            name: currentUser,
        });

        setIsEditName(false);
    };

    const onChange = (event: SyntheticEvent) => {
        let {target} = event;

        let {value} = target;

        if (target.type === 'checkbox')
            value = target.checked;

        setForm({
            ...form,
            [event.target.name]: value,
        });
    };

    const createToken = (event: SyntheticEvent) => {
        event.preventDefault();
        updateToken();
    };

    const renderNameField = () => {
        return (
            <div className={css.fields}>
                <TextField
                    className={css.field}
                    name="name"
                    onChange={onChange}
                    size="small"
                    value={form.name}
                />

                <div className={css.buttons}>
                    <Button
                        className={css.button}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setIsEditName(false)}
                    >{t('save')}</Button>

                    <Button
                        color="secondary"
                        size="small"
                        className={css.button}
                        onClick={cancelEditName}
                    >{t('cancel')}</Button>
                </div>
            </div>
        );
    };

    return (
        <div className={css.settings}>
            <div className={css.title}>{t('settings')}</div>

            <div className={css.section}>
                <div className={css['section-title']}>profile</div>

                <div className={css.item}>
                    <div className={css.label}>{t('name')}:</div>

                    {isEditName
                        ? renderNameField()
                        : <div className={css.value}>{currentUser}</div>
                    }
                </div>
            </div>

            <div className={css.section}>
                <div className={css['section-title']}>{t('token')}</div>

                <div className={css.apitoken}>
                    <div className={css.token}>{currentUserToken}</div>

                    <Copy
                        className={css.copy}
                        copyText={currentUserToken}
                        successMessage={t('tokenIsCopied')}
                    >
                        {({onClick}) => (
                            <div className={css['copy-button']} onClick={onClick}>
                                <span className="mdi mdi-content-copy" />
                            </div>
                        )}
                    </Copy>

                    <SettingsInformation
                        renderModalContent={() => (
                            <UploadStack
                                user={currentUser}
                                configurePythonCommand={config.CONFIGURE_PYTHON_COMMAND(currentUserToken, currentUser)}
                                configureRCommand={config.CONFIGURE_R_COMMAND(currentUserToken, currentUser)}
                                refresh={() => {}}
                                apiUrl={config.API_URL}
                            />
                        )}
                    />
                </div>

                <div className={css.reset}>
                    {t('generatingAnewTokenWillMakeThePreviousTokenInvalid')}
                    {' '}
                    <a onClick={createToken} href="/">{t('generateNewToken')}</a>
                </div>
            </div>
        </div>
    );
};

export default connect(
    state => ({
        currentUser: state.app.userData?.user,
        currentUserToken: state.app.userData?.token,
    }),
    {updateToken, updateSettings}
)(Settings);
