import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Header} from './Event'
import {  BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(<Router><div><Header/></div></Router>, document.getElementById('root'));

