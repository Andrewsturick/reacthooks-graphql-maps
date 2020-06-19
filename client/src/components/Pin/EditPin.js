import React from 'react';
import CreatePin from './CreatePin';
import PinContent from './PinContent';

const EditPin = ({pin}) => {
    return pin._id ? (<PinContent pin={pin} />) : (<CreatePin />)
};

export default EditPin;