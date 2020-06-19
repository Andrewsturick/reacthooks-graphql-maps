const user = {
    name: "Andrew",
    email: "Andrew.sturick@gmail.com",
    _id: "1",
    picture: "localhost:3000"
};

const resolvers = {
    Query: {
        me(root, args, ctx, info) {
            return ctx.user            
        },
        myLocation(root, args, ctx, info) {
            const[latitude, longitude] = ctx.location.ll;

            return {latitude, longitude}
        },
        pins(root, args, context) {
            return context.models.Pin.find({}).lean().exec();
        }
    },
    Mutation: {
        saveImageFile (_, args, context) {
            context.dataSources.cloudinaryAPI.uploadImage(args)
            return {url}
        },
        async savePin(root, args, context) {
            const existingPin = await context.models.Pin.findOne({name: args.pin.title}).lean().exec();
            if (existingPin) {
                throw new Error ("pin with this name already exists");
            }

            const newPin = await context.models.Pin.create({...args.pin, createdAt: Date.now() + "", comments: []});

            return newPin;
        }
    },
    Pin: {
        async author(pin, args, context)  {
            const author = await context.models.User.findById(pin.author).lean().exec();
            return author;
        }
    }
};


module.exports = resolvers;
