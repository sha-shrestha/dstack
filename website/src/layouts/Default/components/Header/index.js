import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter, Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Avatar, Dropdown, SearchField} from 'dstack-react';
import cx from 'classnames';
import routes from 'routes';
import {setSearch, logOut} from 'App/actions';
import css from './styles.module.css';
import logo from 'assets/logo.svg';
import {isSignedIn} from 'utils';

type Props = {
    logOut: Function,
    setSearch: Function,
    toggleMenu: Function,
    search: string,
    searchPlaceholder: ?string,
    className?: string,
    userData: ?{user: string},

    history: {
        push: Function,
    },

    match: {
        params: {
            user?: string
        }
    }
}

const Header = ({
    setSearch,
    search,
    searchPlaceholder,
    logOut,
    className,
    userData,
    match: {params},
    history,
    toggleMenu,
}: Props) => {
    const {t} = useTranslation();

    let user = '';

    if (params && params.user)
        user = params.user;
    else if (userData && userData.user)
        user = userData.user;

    const onChangeSearch = value => setSearch(value);

    const logOutHandle = () => {
        logOut(() => history.push('/'));
    };

    const renderSearch = () => (
        <SearchField
            showEverything
            isDark
            placeholder={searchPlaceholder}
            className={css.search}
            size="small"
            value={search}
            onChange={onChangeSearch}
        />
    );

    return <div className={cx(css.header, className)}>
        {isSignedIn() && <div className={cx(css.menu, 'mdi mdi-menu')} onClick={toggleMenu} />}

        <Link to="/" className={css.logo}>
            <img width="129" height="35" src={logo} alt="logo"/>
        </Link>

        <Switch>
            <Route
                path={routes.auth()}

                render={() => (
                    <div className={css.title}>{t('stacks')}</div>
                )}
            />

            <Route
                exact
                path={routes.dashboards(user)}
                render={renderSearch}
            />

            <Route
                path={routes.dashboardsDetails(user)}

                render={() => (
                    <Link to={routes.dashboards(user)} className={css.back}>
                        <span className="mdi mdi-arrow-left" />
                        {userData && (userData.user === user)
                            ? t('backToDashboards')
                            : t('backToDashboardsOf', {name: user})
                        }
                    </Link>
                )}
            />

            <Route
                path={routes.stackDetails()}

                render={() => (
                    <Link to={routes.stacks(user)} className={css.back}>
                        <span className="mdi mdi-arrow-left" />
                        {userData && (userData.user === user)
                            ? t('backToMyStacks')
                            : t('backToStacksOF', {name: user})
                        }
                    </Link>
                )}
            />

            <Route
                exact
                path={routes.stacks(user)}
                render={renderSearch}
            />
        </Switch>

        {userData && <div className={css.user}>
            <Dropdown
                items={[
                    {
                        title: t('signOut'),
                        onClick: logOutHandle,
                    },
                ]}
            >
                <Avatar className={css.avatar} name={userData.user} />
            </Dropdown>
        </div>}
    </div>;
};

export default connect(
    state => ({
        userData: state.app.userData,
        search: state.app.search,
        searchPlaceholder: state.app.searchPlaceholder,
    }),

    {setSearch, logOut}
)(withRouter(Header));
