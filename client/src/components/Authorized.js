import React, {useContext} from 'react';

import Context from "../context"
import { Redirect } from 'react-router-dom';

const Authorized = ({children}) => {
    const {state, dispatch} = useContext(Context);

    if (!state.isLoggedIn) return <Redirect to="/login" />

    return children;
};

export default Authorized;