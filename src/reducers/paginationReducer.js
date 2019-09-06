const initialState = {
    activePage : 1,
    paginationLink : '',
    pathLink : '',
    refresh:true
};

export default function paginationReducer(state = initialState, action){
    switch(action.type){
        case 'ACTIVE_PAGE':
            return {...state, activePage:action.payload};
        case 'PAGINATION_LINK':
            return {...state, paginationLink:action.payload};
        case 'PATH_LINK':
            return {...state, pathLink:action.payload};
        case 'REFRESH':
            return {...state, refresh:action.payload};
        default:
            return state;
    }
}