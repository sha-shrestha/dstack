import React from 'react';
import cx from 'classnames';
import css from './styles.module.css';

const BackButton = ({Component = 'button', children, className, ...props}) => {
    return (
        <Component className={cx(css.back, className)} {...props}>
            <span className="mdi mdi-arrow-left" />
            {children}
        </Component>
    );
};

export default BackButton;