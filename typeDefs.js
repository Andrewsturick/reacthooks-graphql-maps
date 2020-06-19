const { gql } = require("apollo-server");

module.exports = gql`
directive @auth on FIELD_DEFINITION

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
  }

type File {
    url: String
}

type Query {
    me: User @auth
    myLocation: Location
    pins: [Pin]!
}

type Mutation {
    saveImageFile(file: Upload): File
    savePin(pin: PinInput): Pin
}
`;