// @flow

import React from 'react';
import cx from 'classnames';
import css from './styles.module.css';

type Value = string | number;

type Props = {
    className?: string,
    value: Value,
    onChange: Function,

    items: Array<{
        label: string,
        value: Value,
    }>,
}

const Tabs = ({className, value, items, onChange}: Props) => {

    return (
        <div className={cx(css.tabs, className)}>
            {items.map((i, index) => (
                <div
                    key={index}
                    className={cx(css.tab, {active: value === i.value})}
                    onClick={() => onChange(i.value)}
                >
                    {i.label}
                </div>
            ))}
        </div>
    );
};

export default Tabs;
