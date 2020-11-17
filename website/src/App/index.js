// @flow

import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import routes from 'routes';
import '@mdi/font/css/materialdesignicons.min.css';
import '@dstackai/dstack-react/dist/index.css';

import {NotFound, Loader, UnAuthorizedLayout,
    appStoreActionTypes, useAppStore, Jobs, Reports} from '@dstackai/dstack-react';
import DefaultLayout from 'layouts/Default';

import Login from 'Auth/Login';
import SignUp from 'Auth/SignUp';
import ForgetPassword from 'Auth/ForgetPassword';
import SetPassword from 'Auth/SetPassword';
import ConfirmEmail from 'Auth/ConfirmEmail';
import ConfirmMessage from 'Auth/ConfirmMessage';

import Stacks from 'Stacks';
import Settings from 'Settings';

import {isSignedIn} from '@dstackai/dstack-react/dist/utils';
import {fetchUser, fetchConfigInfo} from './actions';
import css from './styles.module.css';

const DefaultLayoutRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}

            render={props => (
                <DefaultLayout>
                    <Component {...props} />
                </DefaultLayout>
            )}
        />
    );
};

const UnAuthorizedLayoutRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}

            render={props => (
                <UnAuthorizedLayout>
                    <Component {...props} />
                </UnAuthorizedLayout>
            )}
        />
    );
};

type Props = {
    location: {
        pathname: string,
    },

    fetchUser: Function,
    fetchConfigInfo: Function,
    userLoading: boolean,
    userData: ?{user: string},
}

const App = ({fetchUser, fetchConfigInfo, userData, userLoading, history: {push}}: Props) => {
    const [loading, setLoading] = useState(true);
    const [, dispatch] = useAppStore();
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isSignedIn()) {
            dispatch({type: appStoreActionTypes.FETCH_CURRENT_USER});

            Promise.all([
                fetchUser().then(
                    data => dispatch({
                        type: appStoreActionTypes.FETCH_CURRENT_USER_SUCCESS,
                        payload: data,
                    }),
                ),

                fetchConfigInfo().then(
                    data => dispatch({
                        type: appStoreActionTypes.FETCH_CONFIG_INFO_SUCCESS,
                        payload: data,
                    }),
                ),
            ])
                .catch(() => {
                    setLoading(false);
                    dispatch({type: appStoreActionTypes.FETCH_CURRENT_USER_FAIL});
                    push(routes.authLogin());
                });
        } else
            setLoading(false);
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setLoading(userLoading);
        }
    }, [userLoading]);

    return (
        <div className={css.app}>
            {!loading && (
                <Switch>
                    {isSignedIn() && userData && (
                        <Redirect
                            exact
                            from="/"
                            to={routes.stacks(userData.user)}
                        />
                    )}

                    <Redirect
                        exact
                        from="/"
                        to={routes.authLogin()}
                    />

                    <Route path={routes.authLogin()} component={Login}/>
                    <Route path={routes.authSignUp()} component={SignUp}/>
                    <Route path={routes.authForgetPassword()} component={ForgetPassword}/>
                    <Route path={routes.authResetPassword()} component={SetPassword}/>
                    <DefaultLayoutRoute path={routes.verifyUser()} component={ConfirmEmail}/>
                    <DefaultLayoutRoute path={routes.confirmEmailMessage()} component={ConfirmMessage}/>

                    {isSignedIn() && (
                        <Switch>
                            <DefaultLayoutRoute path={routes.notFound()} component={NotFound} />
                            <DefaultLayoutRoute path={routes.settings()} component={Settings} />
                            <DefaultLayoutRoute path={routes.reports()} component={Reports} />
                            <DefaultLayoutRoute path={routes.jobs()} component={Jobs} />
                            <DefaultLayoutRoute path={routes.stacks()} component={Stacks} />
                        </Switch>
                    )}

                    {!isSignedIn() && (
                        <Switch>
                            <UnAuthorizedLayoutRoute path={routes.notFound()} component={NotFound} />
                            <UnAuthorizedLayoutRoute path={routes.reports()} component={Reports} />
                            <UnAuthorizedLayoutRoute path={routes.jobs()} component={Jobs} />
                            <UnAuthorizedLayoutRoute path={routes.stacks()} component={Stacks} />
                        </Switch>
                    )}

                    <Redirect
                        to={routes.notFound()}
                    />
                </Switch>
            )}

            {loading && <DefaultLayout>
                <Loader />
            </DefaultLayout>}
        </div>
    );
};

export default connect(
    state => ({
        userLoading: state.app.userLoading,
        userData: state.app.userData,
    }),
    {fetchUser, fetchConfigInfo},
)(withRouter(App));
