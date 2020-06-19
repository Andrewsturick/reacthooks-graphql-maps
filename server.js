const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const models = require("./models/models");
const { findOrCreateUser } = require("./controllers/userController");
const {AuthenticationDirective} = require("./directives");
const expressIP = require("express-ip")
const cors = require('cors')
const {CloudinaryAPI} = require("./dataSources");
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
        context: async ({req}) => {
            const now = Date.now()
            const user = await findOrCreateUser(req.headers.authorization);
            return {user, models, location: req.ipInfo};
        },
        schemaDirectives: {
            auth: AuthenticationDirective
        }
    });
        
    app.use(cors({allowedHeaders: ["authorization", "Content-Type", "Access-Control-Allow-Origin"]}));
    app.use(expressIP().getIpInfoMiddleware);

    server.applyMiddleware({app})
    
    app.listen({port: 4000}, () => console.log("listening on " + 4000));
}


initServer()


