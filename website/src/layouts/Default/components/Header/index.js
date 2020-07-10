import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Avatar, Dropdown, Yield} from '@dstackai/dstack-react';
import cx from 'classnames';
import {logOut} from 'App/actions';
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
    logOut,
    className,
    userData,
    history,
    toggleMenu,
}: Props) => {
    const {t} = useTranslation();

    const logOutHandle = () => {
        logOut(() => history.push('/'));
    };

    return <div className={cx(css.header, className)}>
        {isSignedIn() && <div className={cx(css.menu, 'mdi mdi-menu')} onClick={toggleMenu} />}

        <Link to="/" className={css.logo}>
            <img width="129" height="35" src={logo} alt="logo"/>
        </Link>

        <Yield className={css.yield} name="header-yield" />

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
    state => ({userData: state.app.userData}),

    {logOut}
)(withRouter(Header));
