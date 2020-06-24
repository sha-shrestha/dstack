import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import cx from 'classnames';
import routes from 'routes';
import Button from 'components/Button';
import logo from 'assets/logo.svg';
import css from './styles.module.css';

type Props = {
    className?: string,
}

const Header = ({className, history: {push}}: Props) => {
    const {t} = useTranslation();
    const logIn = () => push(routes.authLogin());
    const signUp = () => push(routes.authSignUp());

    return <div className={cx(css.header, className)}>
        <Link to="/" className={css.logo}>
            <img width="129" height="35" src={logo} alt="logo"/>
        </Link>

        <div className={css.buttons}>
            <Button
                className={css.button}
                color="primary"
                onClick={logIn}
            >{t('logIn')}</Button>

            <Button
                className={css.button}
                color="primary"
                variant="contained"
                onClick={signUp}
            >{t('signUp')}</Button>
        </div>
    </div>;
};

export default withRouter(Header);
