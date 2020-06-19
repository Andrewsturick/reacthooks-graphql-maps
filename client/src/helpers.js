import {GraphQLClient} from "graphql-request";

function getGraphQLClient(token) {

    if(!token) {
        console.log("NO TOKEN")
        debugger
    }
  return new GraphQLClient("http://as.be.ngrok.io/graphql", {
    headers: {
      authorization: token
    }
  })
}

export {getGraphQLClient};