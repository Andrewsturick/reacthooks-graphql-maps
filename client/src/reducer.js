const reducer = (state, {type, ...action}) => {
    switch(type) {
        case "SAVE_USER":
            return {...state, currentUser: action.user};
        case "IS_LOGGED_IN":
            return {...state, isLoggedIn: action.isLoggedIn};
        case "LOGOUT": 
            return {...state, isLoggedIn: false, currentUser: null}
        case "SET_CURRENT_LOCATION":
            return {...state, location: action.location, isLoadingMapData: false};
        case "IS_LOADING_MAP_DATA":
            return {...state, isLoadingMapData: action.isLoadingMapData};
        case "SET_DRAFT_PIN":
            return  {...state, draftPin: action.pin};
        case "ADD_PIN":
            return {...state, pins: state.pins.concat(action.pin)};
        case "SET_PINS":
             return {...state, pins: action.pins};
        case "CACHE_APOLLO_CLIENT":
            return {...state, client: action.client};
        case "SAVE_GOOGLE_TOKEN":
            return {...state, token: action.token}    
        default:
            return state;
}
}

export default reducer;