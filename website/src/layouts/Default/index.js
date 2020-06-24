import React, {useState} from 'react';
import {connect} from 'react-redux';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProgressBar from 'components/ProgressBar';
import css from './styles.module.css';

const DefaultLayout = ({children, appProgressIsActive, appProgress}) => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const toggleMenu = () => setIsShowMenu(!isShowMenu);

    return (
        <div className={css.layout}>
            <Sidebar
                isShow={isShowMenu}
                toggleMenu={toggleMenu}
                className={css.sidebar}
            />

            <ProgressBar
                className={css.progress}
                isActive={appProgressIsActive}
                progress={appProgress}
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

export default connect(
    state => ({
        appProgressIsActive: state.app.progressIsActive,
        appProgress: state.app.progress,
    })
)(DefaultLayout);
