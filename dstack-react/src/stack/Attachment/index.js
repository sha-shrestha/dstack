import React, {useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import axios from 'axios';
import {get, isEqual} from 'lodash-es';
import {useTranslation} from 'react-i18next';
import Plot from 'react-plotly.js';
import * as CSV from 'csv-string';
import Table from './Table';
import config from '../../config';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import usePrevious from '../../hooks/usePrevious';
import actions from './actions';
import {useStateValue} from './store';
import {unicodeBase64Decode} from '../../utils';
import css from './styles.module.css';

type Props = {
    id: number,
    frameId: string,
    stack: string,
    className?: string,
    withLoader?: boolean,
}

const base64ToJSON = (base64: string) => {
    let parsedJSON;

    try {
        parsedJSON = JSON.parse(atob(base64));
    } catch (e) {
        console.log(e);
    }

    return parsedJSON;
};

const base64ImagePrefixes = {
    'image/svg+xml': 'data:image/svg+xml;charset=utf-8;',
    'image/png': 'data:image/png;charset=utf-8;',
    'image/jpeg': 'data:image/jpeg;charset=utf-8;',
};

const isImageType = type => /^image/.test(type);

const Attachment = ({
    id,
    className,
    frameId,
    isList,
    withLoader,
    stack,
}: Props) => {
    const {t} = useTranslation();
    const {fetchAttachment} = actions();
    const [{data, apiUrl}] = useStateValue();
    const {loading, error, requestStatus, ...attachment} = get(data, `${frameId}.${id}`, {});
    const [tableScale, setTableScale] = useState(1);
    const [loadingFullAttachment, setLoadingFullAttachment] = useState(false);
    const [fullAttachment, setFullAttachment] = useState(null);
    const viewRef = useRef(null);
    const prevAttachment = usePrevious(attachment);

    useEffect(() => {
        if (window && isList)
            window.addEventListener('resize', onResizeCard);

        return () => {
            if (window && isList)
                window.removeEventListener('resize', onResizeCard);
        };
    }, []);

    const fetchFullAttachment = async () => {
        setLoadingFullAttachment(true);

        try {
            const url = config.STACK_ATTACHMENT(stack, frameId, id) + '?download=true';
            const {data} = await axios({
                baseUrl: apiUrl,
                url,
            });

            setFullAttachment(data.attachment);
        } catch (e) {
            console.log(e);
        }

        setLoadingFullAttachment(false);
    };

    useEffect(() => {
        if (!isList && attachment
            && !isEqual(prevAttachment, attachment)
            && attachment.preview
            && isImageType(attachment['content_type'])
        ) {
            fetchFullAttachment();
        }
    }, [data]);

    useEffect(() => {
        if (!isList
            && (typeof id === 'number' && frameId)
            && ((!attachment.data && !error) || (attachment?.index !== id))
        ) {
            fetchAttachment(stack, frameId, id);
        }
    }, [id, frameId]);

    const [ref] = useIntersectionObserver(() => {
        if (isList && !loading && (
            (!attachment.data && !error)
            || (attachment.data && attachment.index !== id)
        ))
            fetchAttachment(stack, frameId, id);
    }, {}, [id, frameId, data]);

    useEffect(() => {
        if (attachment && attachment['application'] === 'bokeh' && Bokeh) {
            const json = base64ToJSON(attachment.data);

            if (json && document.querySelector(`#bokeh-${frameId}`))
                Bokeh.embed.embed_item(json, `bokeh-${frameId}`);
        }

        if (isList)
            setTimeout(() => onResizeCard(), 10);

    }, [data]);

    const onResizeCard = () => {
        if (ref.current && viewRef.current) {
            const containerWidth = ref.current.offsetWidth;
            const viewWidth = viewRef.current.offsetWidth / tableScale;

            let newScale = containerWidth / viewWidth;

            if (newScale > 1)
                newScale = 1;

            setTableScale(newScale);
        }
    };

    const renderImage = () => {
        if (!attachment.preview)
            return (
                <img
                    src={`${base64ImagePrefixes[attachment['content_type']]}base64,${attachment.data}`}
                    alt=""
                />
            );
        else if (fullAttachment) {
            if (fullAttachment['download_url']) {
                return (
                    <img src={fullAttachment['download_url']} alt=""/>
                );
            } else
                return (
                    <img
                        src={`${base64ImagePrefixes[attachment['content_type']]}base64,${attachment.data}`}
                        alt=""
                    />
                );
        }

        return null;
    };

    const renderCSV = () => {
        const decodeCSV = unicodeBase64Decode(attachment.data);

        if (decodeCSV) {
            const data = CSV.parse(decodeCSV);

            if (Array.isArray(data) && data.length)
                return (
                    <Table
                        data={data}
                    />
                );
        }

        return (
            <div className={css.text}>{t('notSupportedAttachment')}</div>
        );
    };

    const renderPlotly = () => {
        const json = base64ToJSON(attachment.data);

        if (!json)
            return null;

        json.layout.width = '100%';
        json.layout.margin = 0;
        json.layout.autosize = true;
        json.config = {responsive: true};

        return (
            <Plot
                {...json}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                useResizeHandler
            />
        );
    };

    const renderBokeh = () => <div id={`bokeh-${frameId}`} />;

    const renderAttachment = () => {
        if (loading)
            return null;

        if (requestStatus === 404 && isList)
            return <div className={css.message}>{t('notFound')}</div>;

        if (requestStatus === 404 && !isList)
            return <div className={css.text}>{t('noPreview')}</div>;

        if (attachment.preview && isList && isImageType(attachment['content_type']))
            return <div className={css.message}>{t('noPreview')}</div>;

        switch (true) {
            case (attachment['content_type'] === 'image/svg+xml'):
            case (attachment['content_type'] === 'image/png'):
            case (attachment['content_type'] === 'image/jpeg'):
                return renderImage();

            case (attachment['content_type'] === 'text/csv'):
                return renderCSV();

            case (attachment['application'] === 'plotly'):
                return renderPlotly();

            case (attachment['application'] === 'bokeh'):
                return renderBokeh();

            case undefined:
                return null;

            default:
                return <div className={isList ? css.message : css.text}>{t('notSupportedAttachment')}</div>;
        }
    };

    return (
        <div
            ref={ref}
            className={cx(css.attachment, className, {
                'is-list': isList,
                loading: loading && withLoader || loadingFullAttachment,
            })}
        >
            <div
                ref={viewRef}
                className={cx(css.view, {
                    'table': (attachment && attachment.data && attachment['content_type'] === 'text/csv'),
                    'bokeh': (attachment && attachment.data && attachment['application'] === 'bokeh'),
                })}

                style={
                    (attachment && attachment['content_type'] === 'text/csv')
                        ? {transform: `scale(${tableScale})`}
                        : {}
                }
            >
                {renderAttachment()}
            </div>
        </div>
    );
};

export default Attachment;
