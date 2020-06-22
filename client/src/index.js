import React, {useReducer, useContext} from "react";
import ReactDOM from "react-dom"
import App from "./pages/App";
import Splash from "./pages/Splash"
import Context from './context';
import reducer from './reducer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AuthorizedRoute from "./components/AuthorizedRoute";
import 'mapbox-gl/dist/mapbox-gl.css';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloClient, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import {WebSocketLink} from "apollo-link-ws";
import {ApolloProvider} from "@apollo/react-hooks"


const GRAPHQL_ENDPOINT = "as.be.ngrok.io/graphql";

const wsLink = new WebSocketLink({
  uri: "ws://" + GRAPHQL_ENDPOINT,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams:() => ({headers: {authorization: localStorage.getItem("token")}})
  }}
);


const httpLink = new HttpLink({uri: "http://" + GRAPHQL_ENDPOINT})
const splitLink = split(
  (data) => {
    const definition = getMainDefinition(data.query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  uri: "http://" + GRAPHQL_ENDPOINT
})

const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ApolloProvider client={apolloClient}>
        <Router>
          <Context.Provider value={{state, dispatch}}>
            <Switch>
                <AuthorizedRoute exact path="/" component={App} redirectTo="/login"/>
                <Route path="/login" component={Splash} />
            </Switch>
          </Context.Provider>
        </Router>
      </ApolloProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));