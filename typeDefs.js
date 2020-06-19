const { gql } = require("apollo-server");

module.exports = gql`
directive @auth on FIELD_DEFINITION
directive @authorizePinOwner on FIELD_DEFINITION

type User {
    _id: ID
    name: String
    email: String
    picture: String
}

type Location {
    latitude: Float
    longitude: Float
}

type Pin {
    _id: ID
    createdAt: String
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    author: User
    comments: [Comment]
}

input PinInput {
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    author: String
}

type Comment {
    text: String
    createdAt: String
    author: User
    _id: ID
}

type File {
    url: String
}

input DeletePinInput {
    _id: ID
}

input SaveCommentInput {
    text: String
    author: ID
    pin: ID
}

type Query {
    me: User @auth
    myLocation: Location
    pins: [Pin]!
}

type Mutation {
    saveImageFile(file: Upload): File
    savePin(pin: PinInput): Pin
    deletePin(pin: DeletePinInput): Pin @authorizePinOwner
    saveComment(comment: SaveCommentInput): Pin
}

type Subscription {
    updatePin: Pin
    deletePin: Pin
    addPin: Pin
}
`;