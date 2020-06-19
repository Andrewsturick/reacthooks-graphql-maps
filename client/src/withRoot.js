import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { ApolloClient } from '@apollo/client';
// import {ApolloProvider} from "@apollo/react-hooks"
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700]
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    }
  },
  typography: {
    useNextVariants: true
  }
});



function withRoot(Component) {
  function WithRoot(props) {
    // const client = new ApolloClient({
    //   link: new HttpLink(),
    //   cache: new InMemoryCache(),
    //   uri: "http://as.be.ngrok.io/graphql",
    // });
    
    // console.log(client)
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* https://material-ui.com/getting-started/usage/#cssbaseline */}
        <CssBaseline />
        {/* <ApolloProvider client={client}> */}
          <Component {...props} />
        {/* </ApolloProvider> */}
        
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
