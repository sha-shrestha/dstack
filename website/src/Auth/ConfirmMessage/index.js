import React from 'react';
import {useTranslation} from 'react-i18next';
import css from './styles.module.css';

const ConfirmMessage = ({}) => {
    const {t} = useTranslation();

    return (
        <div className={css.text}>{t('weVeSentYouEmailWithTheConfirmation')}</div>
    );
};

export default ConfirmMessage;
