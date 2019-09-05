import {createStore} from 'redux';
import { reducers } from './../reducers/repoReducer';

export const repoStore = (initialState = {}) => {
    const store = createStore(reducers, initialState);
    return store;
}

export const store = repoStore();