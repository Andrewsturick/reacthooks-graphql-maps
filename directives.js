const {SchemaDirectiveVisitor, AuthenticationError} = require("apollo-server");
const {defaultFieldResolver} = require("graphql");

class AuthorizePinOwnerDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const resolver = field.resolve || defaultFieldResolver;

        field.resolve = async (root, args, context, info)=> {

            const pin = await context.models.Pin.findById(args.pin._id).lean().exec();
            const isSameUser = pin.author == context.user._id.toString();
            
            if (!isSameUser) {
                throw new AuthenticationError("You can only delete pins you created");
            }   

            return resolver.call(this, root, args, context, info);
        }
    }
}

class AuthenticationDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const resolve = field.resolve || defaultFieldResolver;
        
        field.resolve = async (root, args, ctx, info) => {
            if (!ctx.user._id) throw new AuthenticationError("Please sign in");

            return resolve.call(this, root, args, ctx, info);
        }
    }
}

module.exports = {
    AuthenticationDirective,
    AuthorizePinOwnerDirective
}