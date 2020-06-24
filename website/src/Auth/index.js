import React from 'react';
import {Link} from 'react-router-dom';
import logo from 'assets/logo.svg';
import modal from './assets/modal.svg';
import css from './styles.module.css';

const Auth = ({children}) => {
    return <div className={css.auth}>
        <div className={css.wave} />

        <div className={css.header}>
            <Link to="/">
                <img src={logo} alt="Logo" width="129" height="35" />
            </Link>
        </div>

        <img className={css.modal} src={modal} alt="Logo" width="874" height="569" />
        <div className={css.content}>{children}</div>
    </div>;
};

export default Auth;
