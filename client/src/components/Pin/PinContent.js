import React, {useContext} from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FaceIcon from "@material-ui/icons/Face";
import Context from "../../context";
import moment from "moment";
import CreateComment from "../Comment/CreateComment";
import Comments from "../Comment/Comments";
import { useSubscription } from "@apollo/react-hooks";
import {PIN_UPDATED} from "../../graphql/mutations"

const PinContent = ({classes}) => {
  const {state, dispatch} = useContext(Context);
  
  const { data, loading } = useSubscription(
    PIN_UPDATED,
    { 
      variables: { pin: state.currentPin._id } ,
      onSubscriptionData(data) {
        console.log({data})
        dispatch({type: "SET_CURRENT_PIN", data: data.pinUpdated})
      }
    });

  const {title, content, author, createdAt, comments} = data ? data.pinUpdated : state.currentPin;

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h4" color="primary" gutterBottom>
        {title}
      </Typography>
      <Typography className={classes.text} component="h3" variant="h6" color="inherit" gutterBottom>
        <FaceIcon className={classes.icon} /> 
        {author.name}
      </Typography>
      <Typography className={classes.text}  variant="subtitle2" color="inherit" gutterBottom>
        <AccessTimeIcon className={classes.icon} /> 
        {moment(parseInt(createdAt)).format("MM/DD/YYYY")}
      </Typography>
      <Typography className={classes.text}  variant="subtitle1" color="inherit" gutterBottom>
        {content}
      </Typography>
      <CreateComment />
      <Comments comments={comments}/>
    </div>
  );
}

const styles = theme => ({
  root: {
    padding: "1em 0.5em",
    textAlign: "center",
    width: "100%"
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withStyles(styles)(PinContent);
