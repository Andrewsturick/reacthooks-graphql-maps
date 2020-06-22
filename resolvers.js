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

            const pinAdded = await context.models.Pin.create({...args.pin, createdAt: Date.now() + "", comments: []});
            pubsub.publish("PIN_ADDED", {pinAdded})
            console.log("pin added", pinAdded)
            return pinAdded;
        },
        async deletePin (root, args, context) {
            const pinDeleted = await context.models.Pin.findOneAndDelete({_id: args.pin._id});
            if (pinDeleted && pinDeleted._id) {
                console.log({pinDeleted})
                pubsub.publish("PIN_DELETED", {pinDeleted})
                return pinDeleted;
            }

            throw new Error("could not delete pin");
        },
        async saveComment (root, args, context) {
            const pin = await context.models.Pin.findById(args.comment.pin).lean().exec();
            
            if (!pin) throw new Error("Pin not found");
            
            const comments = [{author: context.user._id, createdAt: Date.now() + "", text: args.comment.text}].concat(pin.comments)
            
            const updatedPin = await context.models.Pin.findOneAndUpdate({_id: args.comment.pin}, {comments}, {new: true});

            pubsub.publish("UPDATE_PIN", {pinUpdated: updatedPin, user});
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
        pinUpdated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('UPDATE_PIN'),
                (payload, variables) => {
                    return payload.pinUpdated._id + "" === variables.pin;
                },
              )
        },
        pinAdded: {
            subscribe: () => pubsub.asyncIterator("PIN_ADDED")
        },
        pinDeleted: {
            subscribe: () => pubsub.asyncIterator("PIN_DELETED")
        },
    }
};


module.exports = resolvers;
