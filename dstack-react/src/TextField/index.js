// @flow
import React from 'react';
import cx from 'classnames';
import css from './styles.module.css';

type Props = {
    size?: 'normal' | 'middle' | 'small',
    label?: string,
    className?: string,
    errors?: Array<string>,
}

const TextField = ({label, className, size = 'normal', errors = [], ...props}: Props) => {
    const hasErrors = Boolean(errors.length);

    return (
        <div className={cx(css.field, className, size, {disabled: props.disabled})}>
            <label>
                {label && <div className={css.label}>{label}</div>}

                <div className={css.input}>
                    {/*$FlowFixMe*/}
                    <input
                        className={cx({error: hasErrors})}
                        {...props}
                    />
                </div>

                {hasErrors && <div className={css.error}>{errors.join(', ')}</div>}
            </label>
        </div>
    );
};

export default TextField;
