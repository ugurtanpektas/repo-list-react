import {combineReducers} from 'redux';

export const repos = (state = {}, action) => {
    switch(action.type){
        case 'GET_REPOS_START':
            return {};
        case 'GET_REPOS':
            return action.repos;
        default:
            return state;
    }
}

export const reducers = combineReducers({
    repos,
}); 