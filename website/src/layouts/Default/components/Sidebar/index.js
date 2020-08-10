import React, {useRef} from 'react';
import {connect} from 'react-redux';
import {Link, NavLink, useRouteMatch, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import cx from 'classnames';
import {isSignedIn} from '@dstackai/dstack-react/dist/utils';
import config from 'config';
import routes from 'routes';
import {useOnClickOutside} from '@dstackai/dstack-react/dist/hooks';
import {startAppProgress, completeAppProgress} from 'App/actions';
import logo from 'assets/logo.svg';
import css from './styles.module.css';
import {fetchList} from 'Stacks/List/actions';
import {useLocation} from 'react-router';


type Props = {
    className?: string,
    currentUser?: string,
    toggleMenu: Function,
    isShow: boolean,
    userLoading: boolean,
}

const Sidebar = ({
    className, currentUser, isShow, toggleMenu, userLoading,
    fetchStacksList, startAppProgress, completeAppProgress,
}: Props) => {
    const {t} = useTranslation();
    const {path} = useRouteMatch();
    const params = useParams();
    const {pathname} = useLocation();
    const sidebarRef = useRef(null);

    useOnClickOutside(sidebarRef, () => isShow && toggleMenu());

    const getMenuItemClick = item => () => {
        if (isShow)
            toggleMenu();

        if (item.onClick)
            item.onClick();
    };

    const refreshStacks = () => {
        if (pathname === routes.stacks(params.user)) {
            startAppProgress();
            fetchStacksList(params.user, completeAppProgress);
        }
    };

    const menuItems = [
        {
            to: routes.stacks(currentUser),
            label: t('stacks'),

            isActive: () => (
                new RegExp(path).test(routes.stacks())
                && (!currentUser || (currentUser === params.user))
                && !new RegExp(path + '$').test(routes.dashboards())
            ),

            onClick: refreshStacks,
        },

        {
            to: routes.dashboards(currentUser),
            label: t('dashboards'),
        },

        {
            to: routes.settings(),
            label: t('settings'),
        },
    ];

    return <div className={cx(css.sidebar, className, {show: isShow})} ref={sidebarRef}>
        <div className={cx(css.close, 'mdi mdi-close')} onClick={toggleMenu} />

        <div className={css.logo}>
            <Link to="/">
                <img width="129" height="35" src={logo} alt="logo"/>
            </Link>
        </div>

        {isSignedIn() && !userLoading && <ul className={css.links}>
            {menuItems.map((item, index) => (
                <li key={index} className={css.item}>
                    <NavLink
                        onClick={getMenuItemClick(item)}
                        to={item.to}
                        activeClassName="active"
                        isActive={item.isActive}
                    >
                        <span className={css.label}>{item.label}</span>

                        {item.beta && <sub className={cx(css.sub, 'green-text')}>
                            {t('beta')}
                        </sub>}
                    </NavLink>
                </li>
            ))}

            <li className={css.item}>
                <a
                    href={config.DOCS_URL}
                    target="_blank"
                >
                    <span className={css.label}>{t('docs')}</span>
                </a>
            </li>
        </ul>}
    </div>;
};

export default connect(
    state => ({
        currentUser: state.app.userData?.user,
        userLoading: state.app.userLoading,
    }),

    {fetchStacksList: fetchList, startAppProgress, completeAppProgress}
)(Sidebar);
