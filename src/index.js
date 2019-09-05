import React from 'react';
import {render} from 'react-dom';
import {Router, Route} from 'react-router';
import {HashRouter} from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import RepoDetail from './components/RepoDetail';
import PullRequests from './components/PullRequests';
import Issiues from './components/Issiues';
import { App } from './App';


render(
    <HashRouter>
        <Route exact path="/" component={App}></Route>
        <Route path='/repo/detail/:id' component={RepoDetail}></Route>
        <Route path='/repo/detail/:id/pullrequests' component={PullRequests}></Route>
        <Route path='/repo/detail/:id/issues' component={Issiues}></Route>
    </HashRouter> 
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
