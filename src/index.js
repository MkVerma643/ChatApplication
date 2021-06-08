import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import stateStore from './reduxstore/store'
import {Provider} from 'react-redux'
ReactDOM.render(
  <React.StrictMode>
  <Provider store={stateStore}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);