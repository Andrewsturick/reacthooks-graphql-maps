import gql from "graphql-tag"

const PIN_UPDATED = gql`
subscription($pin: String) {
    pinUpdated(pin: $pin){
        comments {
            text
            author {
                name
                picture
                _id
            }
            createdAt
        }
        _id
        createdAt
        title
        content
        image
        latitude
        longitude
        author {
            _id
            name
            picture
        }
    }
}
`;


const PIN_DELETED = gql`
    subscription {
        pinDeleted {
            _id
        }
    }
`;


const PIN_ADDED = gql`
    subscription {
        pinAdded {
            comments {
            text
            author {
                name
                picture
                _id
            }
            createdAt
        }
        _id
        createdAt
        title
        content
        image
        latitude
        longitude
        author {
            _id
            name
            picture
        }
        }
    }
`;

export {PIN_UPDATED, PIN_DELETED, PIN_ADDED};