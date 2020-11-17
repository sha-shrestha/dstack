// @flow
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {appStoreActionTypes, Loader, useAppStore} from '@dstackai/dstack-react';
import routes from 'routes';
import {verifyUser} from './actions';
import {fetchUser} from 'App/actions';
import {parseSearch} from '@dstackai/dstack-react/dist/utils';
import css from './styles.module.css';

type Props = {
    loading: boolean,
    error: ?string,
    fetchUser: Function,
    verifyUser: Function,
    history: {push: Function},
    location: {search: string},
}

const ConfirmEmail = ({fetchUser, loading, error, history, verifyUser, location}: Props) => {
    const {t} = useTranslation();
    const [, dispatch] = useAppStore();

    useEffect(() => {
        const {user, code, next} = parseSearch(location.search);

        verifyUser({user, code}, () => {
            fetchUser().then(
                data => {
                    dispatch({
                        type: appStoreActionTypes.FETCH_CURRENT_USER_SUCCESS,
                        payload: data,
                    });

                    if (next)
                        history.push(next);
                    else
                        history.push('/');
                },
            );
        });
    }, []);

    return (
        <div className={css.confirm}>
            {error && !loading && <div className={css.message}>
                <div className={css.text}>{error}</div>
                <Link to={routes.authSignUp()}>{t('signUp')}</Link>
            </div>}

            {loading && <Loader />}
        </div>
    );
};

export default connect(
    state => ({
        loading: state.auth.confirmEmail.loading,
        error: state.auth.confirmEmail.error,
    }),

    {verifyUser, fetchUser},
)(ConfirmEmail);
