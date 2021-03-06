

import {createContext} from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from '@apollo/client';
const context = createContext({
    currentUser: null,
    isLoggedIn: false,
    location: null,
    isLoadingMapData: undefined,
    pins: [],
    draftPin: null,
});

export default context;