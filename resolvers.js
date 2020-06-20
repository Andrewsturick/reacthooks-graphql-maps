const { PubSub, withFilter } = require("apollo-server");
const pubsub = new PubSub();

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
        async pins(root, args, context) {
            const pins = await context.models.Pin.find({}).populate("author").lean().exec();

            return pins;
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
            pubsub.publish("ADD_PIN", {addPin: newPin})
            return newPin;
        },
        async deletePin (root, args, context) {
            const deletedPin = await context.models.Pin.findOneAndDelete({_id: args.pin._id});

            if (deletedPin && deletedPin._id) {
                pubsub.publish("DELETE_PIN", {deletePin: deletedPin})
                return deletedPin;
            }

            throw new Error("could not delete pin");
        },
        async saveComment (root, args, context) {
            console.log({args})
            const pin = await context.models.Pin.findById(args.comment.pin).lean().exec();
            
            if (!pin) throw new Error("Pin not found");
            
            const comments = pin.comments.concat({author: context.user._id, createdAt: Date.now() + "", text: args.comment.text})
            
            const updatedPin = await context.models.Pin.findOneAndUpdate({_id: args.comment.pin}, {comments}, {new: true});
            console.log("about to publish")
            pubsub.publish("UPDATE_PIN", {updatePin: updatedPin, args});
            return updatedPin;
        }
    },
    Pin: {

    },
    Comment: {
        async author(comment, _, context) {
            const user = context.models.User.findById(comment.author._id);
            return user;
        }
    },
    Subscription: {
        updatePin: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('UPDATE_PIN'),
                (payload, variables) => {
                    console.log({payload, variables})
                    console.log("trying to filter")
                    console.log()
                 return payload.updatePin._id + "" === payload.args.comment.pin;
                },
              )
        },
        addPin: {
            subscribe: pubsub.asyncIterator("ADD_PIN")
        },
        deletePin: {
            subscribe: pubsub.asyncIterator("DELETE_PIN")
        },
    }
};


module.exports = resolvers;
