const {ApolloServer} = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const models = require("./models/models");
const { findOrCreateUser } = require("./controllers/userController");
const {AuthenticationDirective} = require("./directives");

require("dotenv").config();

console.log(" env  : ", process.env.MONGO_DB)
function initServer() {
    mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true})
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("couldnt conect to mongo for following reason: " + err));


    const server = new ApolloServer({
        resolvers,
        typeDefs,
        context: async ({req}) => {
            const user = await findOrCreateUser(req.headers.authorization);
            return {user, models};
        },
        schemaDirectives: {
            auth: AuthenticationDirective
        }
    });
    
    server.listen().then(serverInfo => console.log("listening on " + serverInfo.url));
}


initServer()


