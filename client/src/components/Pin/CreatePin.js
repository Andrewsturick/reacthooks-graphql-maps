import React, {useState, useContext} from "react";
import Context from "../../context";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import CameraTwoToneIcon from "@material-ui/icons/CameraTwoTone"
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import gql from "graphql-tag"
import {useMutation} from "@apollo/react-hooks"
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from '@apollo/client';
import axios from "axios";
import {GraphQLClient} from "graphql-request";
import { getGraphQLClient } from "../../helpers";
import {SAVE_PIN} from "../../graphql/mutations";



const SAVE_IMAGE_MUTATION = gql`
  mutation saveImageMutation($file: Upload!) {
    saveImageFile(file: $file) {
      url
    }
  }
`;

const CreatePin = ({ classes }) => {
  const {state, dispatch} = useContext(Context);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageData, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [savePin] = useMutation(SAVE_PIN, {
    onCompleted({ savePin: pin }) {
      if (pin) {
        dispatch({type: "SET_DRAFT_PIN", pin: null})
        dispatch({type: "ADD_PIN", pin})
      }
    }
  });
  
  async function handleSavePin() {
    savePin({
      context: {headers: {authorization: state.token}},
      variables: { 
        pin: {
          title,
          content,
          image: imageUrl,
          latitude: state.draftPin.latitude,
          longitude: state.draftPin.longitude,
          author: state.currentUser._id,
        }
      }
    })
  }

  function handleDiscardPin() {
    setImage("");
    setImageUrl("");
    setTitle("");
    setContent("");
    dispatch({type: "SET_DRAFT_PIN", pin: null})
  }

  async function onSelectImage(event) {
    setLoadingImage(true);
    const file = event.target.files[0];
    setImage(file);
    const data = new FormData();
    
    data.append("file", file)
    data.append("upload_preset", "geopins")
    data.append("cloud_name", "andrewmaps")

    setImageUrl({variables: {file}});
    const {data: {url}} = await axios.post("https://api.cloudinary.com/v1_1/andrewmaps/image/upload", data);

    setImageUrl(url);
    setLoadingImage(false);
  }
  
  return (
    <form className={classes.form}>
      <Typography
        className={styles.alignCenter}
        component="h2"
        variant="h4"
        color="textPrimary"
      >
        <LandscapeIcon className={classes.iconLarge}/>Pin Location
      </Typography>
      <div className={classes.imageDisplay}>
        {
          !imageUrl ?
            (<div className={classes.uploadPicturePlaceholder}>

              <AddAPhotoIcon className={classes.uploadPictureIcon}/>
            </div>) :
            (<img className={classes.image} src={imageUrl}></img>)
        }
      </div>
      <div>
        <TextField  style={{marginRight: "15px"}} name="title" label="Title" value={title} onChange={({target}) => setTitle(target.value)} placeholder="Insert pin title here"/>
        <input accept="image/*" id="image" type="file" className={classes.input} onChange={onSelectImage}/>
        <label htmlFor="image">
          <Button component="span" size="small" className={classes.button} style={{backgroundColor: "#aaaaaa", color: imageData ? "green" : ""}}>
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField 
          name="content"
          label="Content"
          multiline
          rows="6"
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={({target}) => setContent(target.value)}
          value={content} />
      </div>
      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleDiscardPin}>
            <ClearIcon className="leftIcon"/> Discard
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={handleSavePin}>
            Save <SaveIcon className={classes.rightIcon}/> 
        </Button>
      </div>
    </form>
  );
};

const styles = theme => ({
  root: {
    position: "relative",
    height: '100vh',
    zIndex:"100"
  },
  imageDisplay: {
    position: "relative",
    marginTop: "5%",
    height: "25%",
    minWidth: "80%",
    maxHeight: "100%",
    maxWidth: "80%",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%"
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%"

    // height: "auto",
    // width: "auto"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  uploadPicturePlaceholder:{
    color: "white",
    width: "100%",
    height: "100%",
    backgroundColor: "#aaaaaa",
  },
  uploadPictureIcon: {
    width: "100%",
    height: "100%"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0,
  }
});

export default withStyles(styles)(CreatePin);
