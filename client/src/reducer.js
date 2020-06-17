const reducer = (state, {type, ...action}) => {
    switch(type) {
        case "SAVE_USER":
            return {...state, currentUser: action.user};
        case "IS_LOGGED_IN":
            return {...state, isLoggedIn: action.isLoggedIn};
    }
}

export default reducer;