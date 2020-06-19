import gql from "graphql-tag";
const ME_QUERY = `
{
	me {
    _id
    name
    email
    picture
  }
}
`;

const MY_LOCATION_QUERY = `{
    myLocation {
        latitude
        longitude
    }
}
`
const  PINS = `
    {
        pins {
            latitude
            longitude
            title
            content
            _id
        }
    }
`;

export {ME_QUERY, MY_LOCATION_QUERY, PINS}; 