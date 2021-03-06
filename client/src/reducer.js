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
        case "SET_CURRENT_PIN":
            return {...state, currentPin: action.pin, draftPin: null};
        case "DELETE_CURRENT_PIN":
            return {...state, pins: state.pins.filter(({_id}) => _id !== action.pin._id)};
        case "PIN_DELETED":
            const pins = state.pins.filter(pin => pin._id != action.deletedPin._id);
            return {...state, pins};
        default:
            return state;
}
}

export default reducer;