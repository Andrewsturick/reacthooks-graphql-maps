import React, {useContext} from "react";
import Login from '../components/Auth/Login';
import Context from "../context";
import { Redirect } from "react-router-dom";

const Splash = () => {
  const {state, dispatch} = useContext(Context);
  if (state.isLoggedIn) {
    return <Redirect to="/" />
  }

  return <Login />;
};

export default Splash;
