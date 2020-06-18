import React, {useContext} from 'react';

import Context from "../context"
import { Redirect, Route } from 'react-router-dom';

const AuthorizedRoute = ({component: Component, children, redirectTo, ...rest}) => {
    const {state, dispatch} = useContext(Context);

    if (children) {
        return state.isLoggedIn ? children : <Redirect to={redirectTo} />;
    }

    const renderRoute = ({...props}) => {
        if (!state.isLoggedIn) return <Redirect to={redirectTo} />;

        return (
            <Component {...props}/>
        );
    };

    return <Route render={renderRoute} {...rest} />
};

export default AuthorizedRoute;