import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import Dropdown from '../../Dropdown';
import Attachment from '../Attachment';
import css from './styles.module.css';

type Props = {
    userData: {user: string},

    data: {
        user: string,
        name: string,
        head: {id: string}
    },

    otherOwner?: boolean,
    deleteAction: Function,
};

const Item = ({
    Component = 'div',
    onClick,
    data,
    deleteAction,
    otherOwner,
    ...rest
}: Props) => {
    const {t} = useTranslation();
    const ref = useRef(null);

    return (
        <Component
            className={css.item}
            ref={ref}
            onClick={onClick}
            {...rest}
        >
            <div className={css.previewWrap}>
                {data.head
                    ? <Attachment
                        className={css.attachment}
                        isList
                        withLoader
                        stack={`${data.user}/${data.name}`}
                        frameId={data.head}
                        id={0}
                    />

                    : <div className={css.emptyMessage}>{t('emptyStack')}</div>
                }
            </div>

            <div className={css.section}>
                <div className={css.content}>
                    <div className={css.name}>
                        {data.name}
                        {' '}
                        <span className={`mdi mdi-lock${data.private ? '' : '-open'}`} />
                    </div>

                    {otherOwner && (
                        <div className={css.by}>{t('by')} {data.user}</div>
                    )}
                </div>

                {deleteAction && (
                    <Dropdown
                        className={css.dropdown}

                        items={[
                            {
                                title: t('delete'),
                                onClick: () => deleteAction(data.name),
                            },
                        ]}
                    />
                )}
            </div>
        </Component>
    );
};

export default Item;
