import React, {useContext, useRef, useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import Context from "../context";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MapIcon from "@material-ui/icons/Map";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
import Signout from "../components/Auth/Signout"

const Header = ({ classes }) => {
  const {state: {currentUser}, dispatch} = useContext(Context);
  const [isDisplayingDropdown, toggleDisplayDropdown] = useState(Boolean(isDisplayingDropdown));
  const imageRef = useRef(null);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.grow}>
            <MapIcon className={classes.mapIcon}/>
            <Typography 
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              GeoPin
            </Typography>
          </div>
          <div className={classes.growRight}>
            <Typography 
              component="h1"
              variant="h6"
              color="inherit"
              noWrap>
                {currentUser.name}
            </Typography>
            <img
              ref={imageRef}
              className={classes.picture}
              src={currentUser.picture}
              onClick={(e) => {
                toggleDisplayDropdown(true)
              }}
              aria-controls="header-dropdown"
              aria-haspopup="true" />
            <Menu
              id="header-dropdown"
              anchorEl={imageRef.current}
              open={isDisplayingDropdown}
              onClose={() => toggleDisplayDropdown(false)}>
                <MenuItem><Signout /></MenuItem>
              </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  growRight: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  mapIcon: {
    marginRight: theme.spacing.unit,
    color: "green",
    fontSize: 45
  },
  mobile: {
    display: "none"
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    marginRight: theme.spacing.unit * 2,
    alignItems: "right"
  }
});

export default withStyles(styles)(Header);
