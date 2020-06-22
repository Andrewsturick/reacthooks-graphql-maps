import React, {useContext, useState} from "react";
import { withStyles } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import Divider from "@material-ui/core/Divider";

import Context from "../../context";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_COMMENT } from "../../graphql/mutations";

const CreateComment = ({ classes }) => {
  const {state, dispatch} = useContext(Context);
  const [comment, editComment] = useState("");

  const [saveComment] = useMutation(SAVE_COMMENT, {
    onCompleted({saveComment: pin}) {
      dispatch({type: "SET_CURRENT_PIN", pin});
      editComment("");
    }
  });

  const handleDeleteComment = () => {
    editComment("");
  }

  const handleEditComment = (e) => {
    editComment(e.target.value);
  }

  const handleCreateComment = async () => {
    editComment("");
    saveComment({
      variables: {
        comment: {
          pin: state.currentPin._id, text: comment, author: state.currentUser._id
        }
      },
      context:  {
        headers: {
          authorization: localStorage.getItem("token")
        }
      }
    });
  }

  return (
    <>
      <form className={classes.form}>
        <ClearIcon className={classes.clearButton}  onClick={handleDeleteComment}/>
        <InputBase value={comment} onChange={handleEditComment} className={classes.input} multiline={true}/>
        <IconButton className={classes.sendButton} onClick={handleCreateComment}>
          <SendIcon /> 
        </IconButton>
      </form>
        <Divider />
    </>
  );
};

const styles = theme => ({
  form: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  clearButton: {
    padding: 0,
    color: "red"
  },
  sendButton: {
    padding: 0,
    color: theme.palette.secondary.dark
  }
});

export default withStyles(styles)(CreateComment);
