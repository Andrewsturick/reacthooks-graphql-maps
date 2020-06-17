import {createContext} from 'react';

const context = createContext({
    currentUser: null,
    isLoggedIn: false,
});

export default context;