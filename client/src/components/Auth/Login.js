import React, {useContext} from "react";
import { withStyles } from "@material-ui/core/styles";
import {GraphQLClient} from "graphql-request";
import GoogleLoginButton from "react-google-login";
import { useHistory } from "react-router-dom";
import Context from "../../context";
import {ME_QUERY} from "../../graphql/queries";


const Login = ({ classes }) => {
  const history = useHistory();
  const {state, dispatch} = useContext(Context);

 
  const onSuccess = async (googleUser) => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient("http://localhost:4000", {
        headers: {
          authorization: idToken
        }
      })
  
      const {me: loggedInUser} = await client.request(ME_QUERY);

      dispatch({type: 'SAVE_USER', user: loggedInUser});
      dispatch({type: 'IS_LOGGED_IN', isLoggedIn: googleUser.isSignedIn()});
      
    } catch(e) {
      console.log(e);
    }
  }

  
  const onFailure = (e) => {
    console.log(e);
  }

  return (
    <div className={classes.root}>
      <GoogleLoginButton
        clientId="30905357343-rjlu4p5kc9qhllvj48pdk9gondvjo0qr.apps.googleusercontent.com"
        buttonText="Sign into geopins" 
        onSuccess={onSuccess}
        onFailure={onFailure}
        theme="dark"
        isSignedIn={true}/>
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
