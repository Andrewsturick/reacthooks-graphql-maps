import {createContext} from 'react';

const context = createContext({
    currentUser: null,
    isLoggedIn: false,
    location: null,
    isLoadingMapData: undefined,
    pins: [],
    draftPin: null
});

export default context;