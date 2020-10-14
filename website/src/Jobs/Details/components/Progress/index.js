// @flow
import React from 'react';
import cx from 'classnames';
import {useTranslation} from 'react-i18next';
import {getFormattedDuration} from '@dstackai/dstack-react/dist/utils';
import type {Job} from 'Jobs/types';
import css from './styles.module.css';

type Props = {
    data: Job,
    className?: string,
    onlyDuration?: boolean,
}

const defaultDuration = 600000;

const Progress = ({data, className, onlyDuration}: Props) => {
    if (!data.started)
        return null;

    const {t} = useTranslation();
    const estimatedDuration = data['estimated_duration'] || defaultDuration;
    const currentDuration = Date.now() - data.started;
    const leftDuration = estimatedDuration - currentDuration;
    const progress = Math.min(currentDuration / estimatedDuration * 100, 100).toFixed();

    return (
        <div className={cx(css.section, className)}>
            {!onlyDuration && <div className={css.progressBar}>
                <div className={css.progress} style={{width: `${progress}%`}} />
            </div>}


            <div className={css.time}>
                {getFormattedDuration(leftDuration)} {t('left')}
            </div>
        </div>
    );
};

export default Progress;