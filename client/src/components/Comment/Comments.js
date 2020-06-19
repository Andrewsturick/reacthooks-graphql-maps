import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const Comments = ({ classes, comments }) => (
  <List className={classes.root}>
    {comments.map((comment, i) => (
      <ListItem
        key={i}
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar src={comment.author.picture} alt={comment.author.name} />
        </ListItemAvatar>
        <ListItemText
         className={classes.commentInfo}>
           <Typography  className={classes.floatRight} component="span" color="textPrimary">
              {comment.author.name}
            </Typography>
            <span className={classes.inline}>{comment.text}</span>
          </ListItemText>
      </ListItem>
    ))}
  </List>
);

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline-block"
  },
  floatRight: {
    float: "right",
    display: "inline-block"
  },
  commentInfo: {
    padding: "inherit",
    position: "relative",
    width: "100%",
    margin: "auto"
  }
  
});

export default withStyles(styles)(Comments);
