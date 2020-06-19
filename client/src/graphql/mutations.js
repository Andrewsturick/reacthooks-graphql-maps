const SAVE_PIN = `
    mutation saveNewPin($pin: PinInput) {
        savePin(pin: $pin) {
            createdAt
            title
            content
            image
            latitude
            longitude
            author {
                _id
                name
                email
            }
            comments {
                text
            }
        }
    }
`;
export {SAVE_PIN};