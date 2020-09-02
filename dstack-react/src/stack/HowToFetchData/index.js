// @flow

import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Tabs from '../../Tabs';
import CodeViewer from '../../CodeViewer';
import {isString} from 'lodash-es';
import config from '../../config';
import css from './styles.module.css';

export const pullPythonCode = data => {
    let a = [`\'/${data.stack}\'`];

    let params = Object.keys(data.params);

    if (params.length > 0) {
        let p = [];

        params.forEach(key => {
            if (isString(data.params[key]))
                p.push(`\'${key}\': \'${data.params[key]}\'`);
            else
                p.push(`\'${key}\': ${data.params[key]}`);
        });
        a.push('params={' + p.join(', ') + '}');
    }

    return `import pandas as pd
import dstack as ds

df = ds.pull(${a.join(', ')})`;
};

export const pullRCode = data => {
    let a = [`\"/${data.stack}\"`];

    let params = Object.keys(data.params);

    if (params.length > 0) {
        params.forEach(key => {
            if (isString(data.params[key]))
                a.push(`\"${key}\" = \"${data.params[key]}\"`);
            else
                a.push(`\"${key}\" = ${data.params[key]}`);
        });
    }

    return `library(dstack)

df <- read.csv(pull(${a.join(', ')}))`;
};

type Props = {
    user?: string,
    token?: string,
    modalMode?: boolean,
}

const HowTo = ({modalMode, user, token, data}: Props) => {
    const {t} = useTranslation();
    const [activeCodeTab, setActiveCodeTab] = useState(1);
    const [activePlatformTab, setActivePlatformTab] = useState(1);

    return (
        <div className={css.howto}>
            {!modalMode && (
                <div className={css.title}>{t('howToFetchDataUsingTheAPI')}</div>
            )}

            <Tabs
                className={css.tabs}
                value={activeCodeTab}
                onChange={setActiveCodeTab}

                tabs={[
                    {
                        label: t('python'),
                        value: 1,
                    },

                    {
                        label: t('r'),
                        value: 2,
                    },
                ]}
            />

            {activeCodeTab === 1 && <div>
                <div className={css.description}>{t('installPipOrCondaPackage')}</div>

                <Tabs
                    className={css.tabs}
                    value={activePlatformTab}
                    onChange={setActivePlatformTab}

                    tabs={[
                        {
                            label: t('pip'),
                            value: 1,
                        },

                        {
                            label: t('conda'),
                            value: 2,
                        },
                    ]}
                />

                {activePlatformTab === 1 && <CodeViewer
                    className={css.code}
                    language="bash"
                >
                    pip install dstack
                </CodeViewer>}

                {activePlatformTab === 2 && <CodeViewer
                    className={css.code}
                    language="bash"
                >
                    conda install dstack -c dstack.ai
                </CodeViewer>}

                <div className={css.description}>{t('configureDStack')}</div>

                <CodeViewer
                    className={css.code}
                    language="bash"
                >
                    {config.CONFIGURE_PYTHON_COMMAND(token, user)}
                </CodeViewer>

                <div className={css.description}>{t('pullDatasetIntro')}</div>

                <CodeViewer
                    className={css.code}
                    language="python"
                >
                    {pullPythonCode(data)}
                </CodeViewer>
            </div>}

            {activeCodeTab === 2 && <div>
                <div className={css.description}>{t('installRPackage')}</div>

                <CodeViewer
                    className={css.code}
                    language="r"
                >
                    install.packages("dstack")
                </CodeViewer>

                <div className={css.description}>{t('configureDStack')}</div>

                <CodeViewer
                    className={css.code}
                    language="r"
                >
                    {config.CONFIGURE_R_COMMAND(token, user)}
                </CodeViewer>

                <div className={css.description}>{t('pullDatasetIntro')}</div>

                <CodeViewer
                    className={css.code}
                    language="r"
                >
                    {pullRCode(data)}
                </CodeViewer>
            </div>}

            <div
                className={css.footer}
                dangerouslySetInnerHTML={{__html: t('notClearCheckTheDocks_2', {href: config.DOCS_URL})}}
            />
        </div>
    );
};

export default HowTo;
