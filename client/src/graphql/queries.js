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

const MY_LOCATION_QUERY = `
    
{
    myLocation {
        latitude
        longitude
    }
}
    `;

export {ME_QUERY, MY_LOCATION_QUERY}; 