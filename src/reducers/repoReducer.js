const initialState = {
    repoList : [],
    repoDetail : [],
    issueList : [],
    pullList : [],
    loading:true
};

export default function repoReducer(state = initialState, action){
    switch(action.type){
        case 'LOADING':
            return {...state, loading:true};
        case 'GET_REPOS':
            return {...state, loading:false, repoList:action.payload};
        case 'GET_REPO_ISSUES':
            return {...state, loading:false, issueList:action.payload};
        case 'GET_REPO_PULLS':
            return {...state, loading:false, pullList:action.payload};
        case 'GET_REPO_DETAIL':
            return {...state, loading:false, repoDetail:action.payload};
        default:
            return state;
    }
}