const user = {
    name: "Andrew",
    email: "Andrew.sturick@gmail.com",
    _id: "1",
    picture: "localhost:3000"
};

const resolvers = {
    Query: {
        me(root, args, ctx, info) {
            console.log("made it to me resolver")
            console.log(ctx.user)
            console.log({ctx})
            return ctx.user            
        }
    }
};


module.exports = resolvers;
