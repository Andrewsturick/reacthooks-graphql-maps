import React from "react";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

const PinIcon = ({size, color}) => {
    return (
        <PlaceTwoTone
          fontSize="inherit"
          style={{color, fontSize: size + "px"}}
        />
    );
}

export default PinIcon;