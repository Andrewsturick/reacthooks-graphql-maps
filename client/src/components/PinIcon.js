import React from "react";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

const PinIcon = ({size, color, onClick}) => {
    return (
        <PlaceTwoTone
          onClick={onClick}
          fontSize="inherit"
          style={{color, fontSize: size + "px"}}
        />
    );
}

export default PinIcon;