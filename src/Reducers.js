import {combineReducers} from 'redux';

import repoReducer from './reducers/repoReducer';
import paginationReducer from './reducers/paginationReducer';

const Reducers = combineReducers({
    repos:repoReducer,
    pagination:paginationReducer
})

export default Reducers;