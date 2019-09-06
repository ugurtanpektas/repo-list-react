import React from 'react';
import {render} from 'react-dom';
import {Route} from 'react-router';
import {HashRouter} from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import RepoDetail from './components/RepoDetail';
import PullRequests from './components/PullRequests';
import Issiues from './components/Issues';
import { App } from './App';

import Reducers from './Reducers';
import { createStore } from 'redux';
import {Provider} from 'react-redux';

const store = createStore(Reducers);


render(
    <Provider store={store}>
        <HashRouter>
            <Route exact path="/" component={App}></Route>
            <Route exact path='/repo/detail/:id' component={RepoDetail}></Route>
            <Route exact path='/repo/detail/:id/pulls' component={PullRequests}></Route>
            <Route exact path='/repo/detail/:id/issues' component={Issiues}></Route>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
