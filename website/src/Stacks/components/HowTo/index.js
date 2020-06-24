// @flow

import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {get} from 'lodash-es';
import css from './styles.module.css';
import Tabs from 'components/Tabs';
import CodeViewer from 'components/CodeViewer';
import config from 'config';

export const reportPlotPythonCode = `import matplotlib.pyplot as plt
from dstack import push_frame

fig = plt.figure()
plt.plot([1, 2, 3, 4], [1, 4, 9, 16])

push_frame("simple", fig, "My first plot")`;

export const installRPackageCode = 'install.packages("dstack")';

export const reportPlotRCode = `library(ggplot2)
library(dstack)

df <- data.frame(x = c(1, 2, 3, 4), y = c(1, 4, 9, 16))
image <- ggplot(data = df, aes(x = x, y = y)) + geom_line()

push_frame("simple", image, "My first plot")`;

type Props = {
    userData?: ?{
        user: string,
        token: string
    },
    modalMode?: boolean,
}

const HowTo = ({userData}: Props) => {
    const {t} = useTranslation();
    const [activeCodeTab, setActiveCodeTab] = useState(1);
    const [activePlatformTab, setActivePlatformTab] = useState(1);

    return (
        <div className={css.howto}>
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
                    {config.CONFIGURE_PYTHON_COMMAND(get(userData, 'token'), get(userData, 'user'))}
                </CodeViewer>

                <div className={css.description}>{t('reportPlotIntro')}</div>

                <CodeViewer
                    className={css.code}
                    language="python"
                >
                    {reportPlotPythonCode}
                </CodeViewer>
            </div>}

            {activeCodeTab === 2 && <div>
                <div className={css.description}>{t('installRPackage')}</div>

                <CodeViewer
                    className={css.code}
                    language="r"
                >
                    {installRPackageCode}
                </CodeViewer>

                <div className={css.description}>{t('configureDStack')}</div>

                <CodeViewer
                    className={css.code}
                    language="r"
                >
                    {config.CONFIGURE_R_COMMAND(get(userData, 'token'), get(userData, 'user'))}
                </CodeViewer>

                <div className={css.description}>{t('reportPlotIntro')}</div>

                <CodeViewer
                    className={css.code}
                    language="r"
                >
                    {reportPlotRCode}
                </CodeViewer>
            </div>}

            <div
                className={css.footer}
                dangerouslySetInnerHTML={{__html: t('notClearCheckTheDocks', {href: config.DOCS_URL})}}
            />
        </div>
    );
};

export default connect(
    state => ({userData: state.app.userData}),
)(HowTo);
