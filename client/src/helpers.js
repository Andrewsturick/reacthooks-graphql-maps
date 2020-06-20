import {GraphQLClient} from "graphql-request";

function getGraphQLClient() {

    // if(!token) {
    //     console.log("NO TOKEN")
    //     debugger
    // }
  const token = localStorage.getItem("token");
  return new GraphQLClient("http://as.be.ngrok.io/graphql", {
    headers: {
      authorization: token
    }
  })
}

export {getGraphQLClient};