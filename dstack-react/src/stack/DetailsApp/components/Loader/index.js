// @flow

import React from 'react';
import css from './styles.module.css';

type Props = {}

const Loader = ({}: Props) => {
    return (
        <div className={css.loader}>
            <div className={css.item} />
            <div className={css.item} />
            <div className={css.button} />
        </div>
    );
};

export default Loader;
