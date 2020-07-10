// @flow

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {debounce as _debounce, get} from 'lodash-es';
import {Button, TextField, Copy} from '@dstackai/dstack-react';
import {updateToken} from 'App/actions';
import {updateSettings} from './actions';
import css from './styles.module.css';

type Props = {
    updateToken: Function,
    updateSettings: Function,

    userData: {
        user: string,
        token: string,
    },

    history: {push: Function}
}

const Settings = ({updateToken, userData, updateSettings}: Props) => {
    const {t} = useTranslation();
    const availableSendingSettings = useRef(false);
    const [isEditName, setIsEditName] = useState(false);
    const updateSettingsDebounce = useCallback(_debounce(updateSettings, 300), []);

    const [form, setForm] = useState({});

    useEffect(() => {
        setForm({...form});
    }, [userData]);

    useEffect(() => {
        if (availableSendingSettings.current)
            updateSettingsDebounce({
                user: userData.user,
                general: {},
            });
        else
            availableSendingSettings.current = true;
    }, [form.comments, form.newsletter]);

    const cancelEditName = () => {
        setForm({
            ...form,
            name: get(userData, 'user'),
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
                        : <div className={css.value}>{get(userData, 'user')}</div>
                    }
                </div>
            </div>

            <div className={css.section}>
                <div className={css['section-title']}>{t('token')}</div>

                <div className={css.apitoken}>
                    <div className={css.token}>{get(userData, 'token')}</div>

                    <Copy
                        className={css.copy}
                        copyText={get(userData, 'token')}
                        successMessage={t('tokenIsCopied')}
                    >
                        {({onClick}) => (
                            <div className={css['copy-button']} onClick={onClick}>
                                <span className="mdi mdi-content-copy" />
                            </div>
                        )}
                    </Copy>
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
    state => ({userData: state.app.userData}),
    {updateToken, updateSettings}
)(Settings);
