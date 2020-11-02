import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import cn from 'classnames';
import {ReactComponent as Chart} from './assets/chart.svg';
// import tableIcon from './assets/table.svg';
import css from './styles.module.css';

type Props = {
    className?: string,
    userData: {user: string},

    data: {
        user: string,
        name: string,
        head: {id: string}
    },

    deleteAction?: Function,
    renderContent?: Function,
};

const Item = ({
    className,
    Component = 'div',
    data,
    deleteAction,
    renderContent,
    ...rest
}: Props) => {
    const {t} = useTranslation();
    const ref = useRef(null);

    const onClickDelete = event => {
        event.stopPropagation();
        event.preventDefault();
        deleteAction(data.name);
    };

    return (
        <Component
            className={cn(css.item, className)}
            ref={ref}
            {...rest}
        >
            <div className={css.icon}>
                <Chart />
            </div>

            <div className={css.top}>
                <div className={css.name}>{data.name}</div>
                <span className={`mdi mdi-lock${data.private ? '' : '-open'}`} />

                {renderContent && (
                    <div className={css.additional}>
                        {renderContent(data)}
                    </div>
                )}
            </div>

            {data.head && (
                <div className={css.date}>
                    {t('updated')} {moment(data.head.timestamp).format('L')}
                </div>
            )}

            {deleteAction && (
                <span className={css.delete} onClick={onClickDelete}>
                    <span className="mdi mdi-close" />
                </span>
            )}
        </Component>
    );
};

export default Item;
