import {createContext} from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from '@apollo/client';
const context = createContext({
    currentUser: null,
    token: null,
    isLoggedIn: false,
    location: null,
    isLoadingMapData: undefined,
    pins: [],
    draftPin: null,
});

export default context;