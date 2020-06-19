const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const models = require("./models/models");
const { findOrCreateUser } = require("./controllers/userController");
const {AuthenticationDirective, AuthorizePinOwnerDirective} = require("./directives");
const expressIP = require("express-ip")
const cors = require('cors')
const {CloudinaryAPI} = require("./dataSources");
const http = require("http");
require("dotenv").config();

function initServer() {
    const app = express();
   
   
    mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true})
        .then(() => console.log("connected to db"))
        .catch((err) => console.log("couldnt conect to mongo for following reason: " + err));


    const server = new ApolloServer({
        resolvers,
        typeDefs,
        dataSources:() => ({
            cloudinaryAPI: CloudinaryAPI.create()
        }),
        context: async ({req, connection = {context: {}}}) => {
            const user = await findOrCreateUser(req.headers.authorization);
            console.log("user in context", user)
            return {user, models, location: req.ipInfo, ...connection.context};
        },
        schemaDirectives: {
            auth: AuthenticationDirective,
            authorizePinOwner: AuthorizePinOwnerDirective
        },
        subscriptions: {
            onConnect: (connectionParams, webSocket) => {
                console.log({connectionParams})
                return {...(connectionParams.headers || {})}
            },
          },
    });
        
    app.use(cors({allowedHeaders: ["authorization", "Content-Type", "Access-Control-Allow-Origin"]}));
    app.use(expressIP().getIpInfoMiddleware);

    server.applyMiddleware({app})
    
    const httpServer = http.createServer(app)
    server.installSubscriptionHandlers(httpServer);
    const PORT = 4000;
    
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
        console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
    })
}


initServer()


