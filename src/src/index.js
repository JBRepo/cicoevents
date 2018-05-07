import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Header } from '../src/event/Header';
import registerServiceWorker from './registerServiceWorker';
import {  BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import eventReducer  from './reducers/eventreducer';

const store = createStore(eventReducer,  {
    events : [],
    eventType : '',
    event : ''
});

ReactDOM.render(<Provider store = {store}><Router><div><Header/></div></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
