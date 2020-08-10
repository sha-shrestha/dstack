import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import cx from 'classnames';
import Button from '../../../Button';
import logo from '../assets/logo.svg';
import css from './styles.module.css';

type Props = {
    className?: string,
}

const Header = ({className}: Props) => {
    const {t} = useTranslation();

    return <div className={cx(css.header, className)}>
        <Link to="/" className={css.logo}>
            <img width="129" height="35" src={logo} alt="logo"/>
        </Link>

        <div className={css.buttons}>
            <Button
                Component={Link}
                to="/auth/login"
                className={css.button}
                color="primary"
            >{t('logIn')}</Button>
        </div>
    </div>;
};

export default Header;
