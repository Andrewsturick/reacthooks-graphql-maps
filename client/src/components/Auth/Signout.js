import React, {useContext} from "react";
import { withStyles } from "@material-ui/core/styles";
import {GraphQLClient} from "graphql-request";
import {GoogleLogout} from "react-google-login";
import { useHistory } from "react-router-dom";
import Context from "../../context";
import {ME_QUERY} from "../../graphql/queries";



const Signout = ({ classes }) => {
  const history = useHistory();
  const {state, dispatch} = useContext(Context);
  
  const onLogoutFailure = (e) => {
    console.log(e);
  }

  const onLogoutSuccess = () => {
    dispatch({type: "LOGOUT"});
  }

  return (
    <div className={classes.root}>
      <GoogleLogout
        clientId="30905357343-rjlu4p5kc9qhllvj48pdk9gondvjo0qr.apps.googleusercontent.com"
        buttonText="Sign out" 
        onLogoutSuccess={onLogoutSuccess}
        onLogoutFailure={onLogoutFailure}
        theme="dark" />
      </div>
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
};

export default withStyles(styles)(Signout);
