import React, {useState} from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import {ProgressBar, useAppStore} from '@dstackai/dstack-react';


import css from './styles.module.css';

const DefaultLayout = ({children}) => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const toggleMenu = () => setIsShowMenu(!isShowMenu);
    const [{appProgress: {active, value}}] = useAppStore();

    return (
        <div className={css.layout}>
            <Sidebar
                isShow={isShowMenu}
                toggleMenu={toggleMenu}
                className={css.sidebar}
            />

            <ProgressBar
                className={css.progress}
                isActive={active}
                progress={value}
            />

            <Header
                toggleMenu={toggleMenu}
                className={css.header}
            />

            <div className={css.main}>
                {children}
            </div>
        </div>
    );
};

export default DefaultLayout;
