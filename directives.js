const {SchemaDirectiveVisitor, AuthenticationError} = require("apollo-server");
const {defaultFieldResolver} = require("graphql");


class AuthenticationDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const resolve = field.resolve || defaultFieldResolver;
        
        field.resolve = async (root, args, ctx, info) => {
            if (!ctx.user._id) throw new AuthenticationError;

            return resolve.call(this, root, args, ctx, info);
        }
    }
}

module.exports = {
    AuthenticationDirective
}