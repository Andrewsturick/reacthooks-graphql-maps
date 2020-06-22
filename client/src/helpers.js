import {GraphQLClient} from "graphql-request";

function getGraphQLClient() {
  const token = localStorage.getItem("token");
  return new GraphQLClient("http://as.be.ngrok.io/graphql", {
    headers: {
      authorization: token
    }
  })
}

export {getGraphQLClient};