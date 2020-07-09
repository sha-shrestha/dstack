// @flow
import React from 'react';
import image from './lock.svg';
import css from './style.module.css';

const AccessForbidden = ({children}) => {
    return (
        <div className={css.forbidden}>
            <img src={image} alt="" width="85" height="104" />

            {children && (
                <div className={css.message}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default AccessForbidden;
