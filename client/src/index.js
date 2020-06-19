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
import {WebSocketLink} from 'apollo-link-ws';
import {ApolloProvider} from "@apollo/react-hooks"

import { SubscriptionClient } from "subscriptions-transport-ws";

const GRAPHQL_ENDPOINT = "ws://as.be.ngrok.io/graphql";

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true
});

const wsLink = new WebSocketLink(client);
const httpLink = new HttpLink({uri: "http://as.be.ngrok.io/graphql"})
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink, // Invalid type
  httpLink
);

const apolloClient = new ApolloClient({
  splitLink,
  cache: new InMemoryCache(),
  uri: "http://as.be.ngrok.io/graphql",
})

console.log(apolloClient)

const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
    // <Context.Provider>
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

const ContextProvider = (props) => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
    // <Context.Provider>

    // </Context.Provider>
  return (
  <Context.Provider value={{state, dispatch}}>
    <Switch>
        <AuthorizedRoute exact path="/" component={App} redirectTo="/login"/>
        <Route path="/login" component={Splash} />
    </Switch>
  </Context.Provider>
  
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));



// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import App from "./pages/App";
// import Splash from "./pages/Splash";

// import "mapbox-gl/dist/mapbox-gl.css";
// import * as serviceWorker from "./serviceWorker";

// const Root = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={App} />
//         <Route path="/login" component={Splash} />
//       </Switch>
//     </Router>
//   );
// };

// ReactDOM.render(<Root />, document.getElementById("root"));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
