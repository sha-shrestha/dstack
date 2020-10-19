// @flow

import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import routes from 'routes';
import '@mdi/font/css/materialdesignicons.min.css';
import '@dstackai/dstack-react/dist/index.css';

import {NotFound, Loader, UnAuthorizedLayout, appStoreActionTypes, useAppStore, Jobs} from '@dstackai/dstack-react';
import DefaultLayout from 'layouts/Default';

import Login from 'Auth/Login';
import ConfirmEmail from 'Auth/ConfirmEmail';

import Dashboards from 'Dashboards';
import Stacks from 'Stacks';
import Settings from 'Settings';

import {isSignedIn} from '@dstackai/dstack-react/dist/utils';
import {fetchUser} from './actions';
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
    userLoading: boolean,
    userData: ?{user: string},
}

const App = ({fetchUser, userData, userLoading, history: {push}}: Props) => {
    const [loading, setLoading] = useState(true);
    const [, dispatch] = useAppStore();
    const isInitialMount = useRef(true);

    // FETCH_CURRENT_USER
    // FETCH_CURRENT_USER_SUCCESS
    // FETCH_CURRENT_USER_FAIL

    useEffect(() => {
        if (isSignedIn()) {
            dispatch({type: appStoreActionTypes.FETCH_CURRENT_USER});

            fetchUser(
                data => dispatch({
                    type: appStoreActionTypes.FETCH_CURRENT_USER_SUCCESS,
                    payload: data,
                }),
                () => {
                    setLoading(false);
                    dispatch({type: appStoreActionTypes.FETCH_CURRENT_USER_FAIL});
                    push(routes.authLogin());
                }
            );
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
                    <DefaultLayoutRoute path={routes.verifyUser()} component={ConfirmEmail}/>

                    {isSignedIn() && (
                        <Switch>
                            <DefaultLayoutRoute path={routes.notFound()} component={NotFound} />
                            <DefaultLayoutRoute path={routes.settings()} component={Settings} />
                            <DefaultLayoutRoute path={routes.dashboards()} component={Dashboards} />
                            <DefaultLayoutRoute path={routes.jobs()} component={Jobs} />
                            <DefaultLayoutRoute path={routes.stacks()} component={Stacks} />
                        </Switch>
                    )}

                    {!isSignedIn() && (
                        <Switch>
                            <UnAuthorizedLayoutRoute path={routes.notFound()} component={NotFound} />
                            <UnAuthorizedLayoutRoute path={routes.dashboards()} component={Dashboards} />
                            {/*<DefaultLayoutRoute path={routes.jobs()} component={Jobs} />*/}
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
    {fetchUser},
)(withRouter(App));
