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

import {ApolloProvider} from "@apollo/react-hooks"
import AuthorizedRoute from "./components/AuthorizedRoute";
import 'mapbox-gl/dist/mapbox-gl.css';
import  ApolloClient from "apollo-boost";

const client = new ApolloClient("http://as.be.ngrok.io/graphql");
const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <ApolloProvider>
        <Context.Provider value={{ state, dispatch }}>
          <Switch>
            <AuthorizedRoute exact path="/" component={App} redirectTo="/login"/>
            <Route path="/login" component={Splash} />
          </Switch>
        </Context.Provider>
  
      </ApolloProvider>
    </Router>
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
