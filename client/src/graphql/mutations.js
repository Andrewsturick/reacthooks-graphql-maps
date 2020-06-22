import gql from "graphql-tag"
const SAVE_PIN = gql`
    mutation saveNewPin($pin: PinInput) {
        savePin(pin: $pin) {
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
            comments {
                text
            }
        }
    }
`;

const DELETE_PIN = `
    mutation deletePin($pin: DeletePinInput) {
        deletePin(pin: $pin) {
            _id
            title
        }
    }
`;

const SAVE_COMMENT = gql`
    mutation saveNewComment($comment: SaveCommentInput) {
        saveComment(comment: $comment) {
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

export {SAVE_PIN, DELETE_PIN, SAVE_COMMENT};