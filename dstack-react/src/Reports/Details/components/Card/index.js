// @flow
import React, {memo, Fragment, useEffect, useState} from 'react';
import moment from 'moment';
import {get, isEqual} from 'lodash-es';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import cx from 'classnames';
import {parseStackParams} from '../../../../utils';
import useDebounce from '../../../../hooks/useDebounce';
import Button from '../../../../Button';
import Tooltip from '../../../../Tooltip';
import ViewSwitcher from '../../../../ViewSwitcher';
import StackAttachment from '../../../../stack/Attachment';
import css from './styles.module.css';

export type DashboardCard = {
    stack: string,
    header?: {},
    index: 0,
}

type Props = {
    data: DashboardCard,
    className?: string,
    type?: 'list' | 'grid',
    attachment: {},
    fetchAttachment: Function,
    deleteCard: Function,
    updateCardTitle: Function,
    filters: {},
    moveAvailable?: boolean,
}

const Card = memo(({
    data,
    className,
    type = 'grid',
    deleteCard,
    updateCardTitle,
    filters,
    forwardedRef,
    moveAvailable,
}: Props) => {
    const [title, setTitle] = useState(data.title);
    const {t} = useTranslation();
    const headId = get(data, 'head.id');
    const stackOwner = data.stack.split('/')[0];
    const [attachmentIndex, setAttachmentIndex] = useState(0);
    const [cardParams, setCardParams] = useState([]);

    useEffect(() => {
        const params = parseStackParams(get(data, 'head.attachments', []));

        if (params)
            setCardParams(Object.keys(params));

    }, [data]);

    useEffect(() => {
        findAttach();
    }, [filters]);

    useEffect(() => {
        if (forwardedRef.current)
            forwardedRef.current.addEventListener('dragstart', event => {
                console.log(event.target);
                event.stopPropagation();
                event.preventDefault();
            });
    }, [forwardedRef]);

    const findAttach = () => {
        const attachments = get(data, 'head.attachments');
        const fields = Object.keys(filters).filter(f => cardParams.indexOf(f) >= 0);

        if (!attachments)
            return;

        if (fields.length) {
            attachments.some((attach, index) => {
                let valid = true;

                fields.forEach(key => {
                    if (!attach.params || !isEqual(attach.params[key], filters[key]))
                        valid = false;
                });

                if (valid)
                    setAttachmentIndex(index);

                return valid;
            });
        } else
            setAttachmentIndex(0);
    };

    const onUpdate = updateCardTitle ? useDebounce(updateCardTitle, []) : () => {};

    const onChangeTitle = event => {
        setTitle(event.target.value);
        onUpdate(event.target.value);
    };

    return (
        <div className={cx(css.card, `type-${type}`, className)} ref={forwardedRef}>
            <div className={css.inner}>
                <div className={css.head}>
                    <div className={cx(css.name, {readonly: !updateCardTitle})}>
                        <div className={css.nameValue}>{title?.length ? title : t('title')}</div>

                        <input
                            value={title}
                            type="text"
                            placeholder={t('title')}
                            onChange={onChangeTitle}
                            className={cx(css.nameEdit, {active: !title?.length})}
                        />
                    </div>

                    <Tooltip
                        overlayContent={(
                            <Fragment>
                                <div>{t('updatedByName', {name: stackOwner})}</div>

                                {data.head && <div className={css.infoTime}>
                                    {moment(data.head.timestamp).format('D MMM YYYY')}
                                </div>}
                            </Fragment>
                        )}
                    >
                        <div className={css.info}>
                            <span className="mdi mdi-information-outline" />
                        </div>
                    </Tooltip>

                    <Button
                        className={cx(css.button, css.link)}
                        color="secondary"
                        Component={Link}
                        to={`/${data.stack}`}
                    >
                        <span className="mdi mdi-open-in-new" />
                    </Button>

                    <div className={css.cardControls}>
                        {deleteCard && <Button
                            className={cx(css.button)}
                            color="secondary"
                            onClick={deleteCard}
                        >
                            <span className="mdi mdi-trash-can-outline" />
                        </Button>}

                        {moveAvailable && (
                            <Button
                                className={cx(css.button, css.move)}
                                color="secondary"
                                data-drop-pointer={true}
                            >
                                <span className="mdi mdi-cursor-move" />
                            </Button>
                        )}

                        {/*<ViewSwitcher*/}
                        {/*    className={css.viewSwitcher}*/}
                        {/*/>*/}
                    </div>
                </div>

                {headId
                    ? <StackAttachment
                        className={css.attachment}
                        isList
                        withLoader
                        stack={data.stack}
                        frameId={headId}
                        id={attachmentIndex}
                    />

                    : <div className={css.emptyMessage}>{t('emptyDashboard')}</div>
                }
            </div>
        </div>
    );
});

export default Card;
