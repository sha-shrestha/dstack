// @flow

import React from 'react';
import {useTranslation} from 'react-i18next';
import cx from 'classnames';
import css from './styles.module.css';

type Value = string | number;

type Props = {
    className?: string,
    value: Value,
    onChange: Function,

    tabs: Array<{
        label: string,
        value: Value,
    }>,
}

const Tabs = ({className, value, tabs, onChange}: Props) => {
    const {t} = useTranslation();

    return (
        <div className={cx(css.tabs, className)}>
            {tabs.map((i, index) => (
                <div
                    key={index}
                    className={cx(css.tab, {active: value === i.value})}
                    onClick={() => onChange(i.value)}
                >
                    {i.label}
                    {i.soon && <span className={css.soon}>{t('soon')}</span>}
                </div>
            ))}
        </div>
    );
};

export default Tabs;
