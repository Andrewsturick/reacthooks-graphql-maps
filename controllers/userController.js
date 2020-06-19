const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

const findOrCreateUser = async (token) => {
    const googleUser = await verifyAuthToken(token);
    const user = await findUserIfExists(googleUser);
    if (user) return user;
    
    const newUser = await createNewUser(googleUser);
    return newUser;
}

const findUserIfExists = async (googleUser) => User.findOne({email: googleUser.email}).exec();

const createNewUser = async ({name, email, picture}) => await User.create({
    name,
    email,
    picture,
});

const verifyAuthToken = async (token) => {
    try {
        const user = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        });

        if (user) {
            return user.getPayload();
        }
    } catch(e) {
        throw new Error("error verifying token : " + e)
    }
}

module.exports = {
    findOrCreateUser
}