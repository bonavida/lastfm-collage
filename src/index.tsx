import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
/** Containers */
import App from 'containers/App';
/** Modules */
import store from 'store';
import * as serviceWorker from './serviceWorker';
/** Styles */
import 'styles/main.scss';

const mountNode = document.getElementById('root');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
