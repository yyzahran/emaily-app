import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css';
import { thunk } from 'redux-thunk';

// For development
import axios from 'axios';
window.axios = axios;

const el = document.getElementById('root');
const root = createRoot(el);

const store = createStore(reducers, {}, applyMiddleware(thunk));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
