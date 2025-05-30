import { Fragment, useState } from 'react';

import { Tab, TabList, TabPanel, TabProvider, Text } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
} from 'react-compare-slider';
import ReactDiffViewer from 'react-diff-viewer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import './DiffComponent.scss';

const b = block('diff-component');

export const DiffComponent = ({
    html,
    oldHtml,
    text,
    oldText,
    screenshot,
    oldScreenshot,
    isFirst,
}: {
    html: string;
    oldHtml: string;
    text: string;
    oldText: string;
    screenshot: string | null;
    oldScreenshot: string | null;
    isFirst: boolean;
}) => {
    const [activeTab, setActiveTab] = useState('text');

    return (
        <TabProvider value={activeTab} onUpdate={setActiveTab}>
            <TabList>
                {isFirst ? (
                    <Fragment>
                        <Tab value="text">Только текст</Tab>
                        {screenshot && <Tab value="image">Только скриншот</Tab>}
                        <Tab value="html">Только HTML</Tab>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Tab value="textDiff">Изменения в тексте</Tab>
                        <Tab value="text">Только текст</Tab>
                        {screenshot && oldScreenshot && (
                            <Tab value="imageDiff">Изменения в скриншотах</Tab>
                        )}
                        {screenshot && <Tab value="image">Только скриншот</Tab>}
                        <Tab value="htmlDiff">Изменения в HTML</Tab>
                        <Tab value="html">Только HTML</Tab>
                    </Fragment>
                )}
            </TabList>

            <div className={b()}>
                <TabPanel value="imageDiff">
                    {activeTab === 'imageDiff' &&
                        oldScreenshot &&
                        screenshot && (
                            <ReactCompareSlider
                                itemOne={
                                    <ReactCompareSliderImage
                                        src={oldScreenshot}
                                        alt="Old screenshot"
                                    />
                                }
                                itemTwo={
                                    <ReactCompareSliderImage
                                        src={screenshot}
                                        alt="New screenshot"
                                    />
                                }
                            />
                        )}
                </TabPanel>
                <TabPanel value="image">
                    {activeTab === 'image' && screenshot && (
                        <img
                            src={screenshot}
                            alt="New screenshot"
                            style={{
                                width: '100%',
                                height: '100%',
                                maxWidth: '100%',
                            }}
                        />
                    )}
                </TabPanel>
                <TabPanel value="html">
                    {activeTab === 'html' && (
                        <SyntaxHighlighter
                            language="html"
                            style={darcula}
                            wrapLines
                            wrapLongLines
                        >
                            {html}
                        </SyntaxHighlighter>
                    )}
                </TabPanel>
                <TabPanel value="htmlDiff">
                    {activeTab === 'htmlDiff' && (
                        <ReactDiffViewer
                            oldValue={oldHtml}
                            newValue={html}
                            splitView={true}
                            useDarkTheme
                        />
                    )}
                </TabPanel>
                <TabPanel value="text">
                    {activeTab === 'text' && (
                        <SyntaxHighlighter
                            language="html"
                            style={darcula}
                            wrapLines
                            wrapLongLines
                        >
                            {text}
                        </SyntaxHighlighter>
                    )}
                </TabPanel>
                <TabPanel value="textDiff">
                    {activeTab === 'textDiff' && (
                        <Text variant="code-1">
                            <ReactDiffViewer
                                oldValue={oldText}
                                newValue={text}
                                splitView
                                useDarkTheme
                            />
                        </Text>
                    )}
                </TabPanel>
            </div>
        </TabProvider>
    );
};
