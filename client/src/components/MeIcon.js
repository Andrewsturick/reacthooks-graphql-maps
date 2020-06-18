import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";

const MeIcon = ({size = 30, color}) => {
    return (
        <AccountCircle
          fontSize="inherit"
          color={color}
          style={{ fontSize: size + "px"}}
        />
    );
}

export default MeIcon;