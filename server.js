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
        context: async ({req, connection, res, ...rest}) => {
            const connectionContext = connection && connection.context ? {...connection.context} : {}

            const user = connectionContext.user ? null : await findOrCreateUser(req.headers.authorization);
            return {user, models, location: req ? req.ipInfo : {}, ...connectionContext};
        },
        schemaDirectives: {
            auth: AuthenticationDirective,
            authorizePinOwner: AuthorizePinOwnerDirective
        },
        subscriptions: {
            onConnect: async (connectionParams, webSocket) => {
                if (!connectionParams.headers) throw new Error(" no token found");

                const user = await findOrCreateUser(connectionParams.headers.authorization);

                return {user, models}
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


