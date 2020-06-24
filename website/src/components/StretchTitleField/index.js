// @flow
import React from 'react';
import cx from 'classnames';
import css from './styles.module.css';

type Props = {
    className?: string,
    value?: ?string,
    placeholder?: string,
}

const StretchTitleField = ({
    value,
    placeholder = '',
    className,
    ...props
}: Props) => {
    return (
        <div className={cx(css.field, className)}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                {...props}
            />

            <div className={css.hidden}>
                {value.length ? value : placeholder}
            </div>
        </div>
    );
};

export default StretchTitleField;
