import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import NoContent from "./Pin/NoContent";
import EditPin from "./Pin/EditPin";

const Blog = ({ classes, pin }) => {   
  return (
    <Paper className={classes.root}>
      {
        !pin ? <NoContent /> : <EditPin pin={pin} />
      }
    </Paper>
  );
};

const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
};

export default withStyles(styles)(Blog);
