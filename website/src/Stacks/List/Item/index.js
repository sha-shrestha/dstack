// @flow

import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {get} from 'lodash-es';
import Dropdown from 'components/Dropdown';
import Attachment from 'Stacks/components/Attachment';
import css from './styles.module.css';
import routes from 'routes';

type Props = {
    userData: {user: string},

    data: {
        user: string,
        name: string,
        head: {id: string}
    },

    deleteAction: Function,
};

const Item = ({
    withLink,
    onClick,
    data,
    deleteAction,
    userData,
}: Props) => {
    const params = useParams();
    const {t} = useTranslation();
    const ref = useRef(null);
    const Component = withLink ? Link : 'div';

    return (
        <Component
            className={css.item}
            ref={ref}
            onClick={onClick}
            {...(withLink ? {to: routes.stackDetails(data.user, data.name)} : {})}
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

                    {params.user !== data.user && (
                        <div className={css.by}>{t('by')} {data.user}</div>
                    )}
                </div>

                {deleteAction && get(userData, 'user') === data.user && (
                    <Dropdown
                        className={css.dropdown}

                        items={[
                            // {
                            //     title: t('rename'),
                            //     onClick: () => {},
                            // },

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

export default connect(
    state => ({userData: state.app.userData})
)(Item);
