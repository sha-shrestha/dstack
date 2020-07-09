// @flow
import React from 'react';
import cx from 'classnames';
import css from './styles.module.css';

type Props = {
    size?: 'normal' | 'small',
    label?: string,
    className?: string,
    errors?: Array<string>,
}

const TextAreaField = ({label, className, size = 'normal', errors = [], ...props}: Props) => {
    const hasErrors = Boolean(errors.length);

    return (
        <div className={cx(css.field, className, size, {disabled: props.disabled})}>
            <label>
                {label && <div className={css.label}>{label}</div>}

                <div className={css.textarea}>
                    {/*$FlowFixMe*/}
                    <textarea
                        className={cx({error: hasErrors})}
                        {...props}
                    />
                </div>

                {hasErrors && <div className={css.error}>{errors.join(', ')}</div>}
            </label>
        </div>
    );
};

export default TextAreaField;
