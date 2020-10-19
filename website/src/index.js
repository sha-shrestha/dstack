import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {StackAttachmentProvider, DnDGridContextProvider, DndProvider, AppStoreProvider} from '@dstackai/dstack-react';
import HTML5Backend from 'react-dnd-html5-backend';
import config from 'config';

import App from 'App';
import store from './store';
import * as serviceWorker from './serviceWorker';

import './i18next';
import './index.css';


const
    rootElement = document.getElementById('root');

if (rootElement instanceof Element) {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <DndProvider backend={HTML5Backend}>
                    <DnDGridContextProvider>
                        <AppStoreProvider apiUrl={config.API_URL}>
                            <StackAttachmentProvider apiUrl={config.API_URL}>
                                <App/>
                            </StackAttachmentProvider>
                        </AppStoreProvider>
                    </DnDGridContextProvider>
                </DndProvider>
            </BrowserRouter>
        </Provider>,

        rootElement
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
