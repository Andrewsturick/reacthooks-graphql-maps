import React, {useState, useContext} from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
// import {gql} from "graphql-tag"

//  const SAVE_IMAGE_MUTATION = gql`
//   mutation saveImageMutation($file: Upload) {
//     saveImage(file: $file) {
//       url
//     }
//   }
// `;

const CreatePin = ({ classes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageData, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  // const [saveImage, { loading: mutationLoading, error: mutationError }] = useMutation(
  //   SAVE_IMAGE_MUTATION,
  //   {
  //     update(cache, { data: { saveImage: {url}}}) {
  //       setLoadingImage(false);
  //       setImageUrl(url)
  //     },
  //     variables: {file: imageData}
  //   },
  // );

  function onSelectImage(event) {  
    setLoadingImage(true);

    return setImage(event.target.files[0]);
  }
  
  console.log({imageData})
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
        {loadingImage ? (<span>loading</span>) : (<img src={imageUrl}></img>)}
      </div>
      <div>
        <TextField name="title" label="Title" value={title} onChange={({target}) => setTitle(target.value)} placeholder="Insert pin title here"/>
        <input accept="image/*" id="image" type="file" className={classes.input} onChange={onSelectImage}/>
        <label htmlFor="image">
          <Button component="span" size="small" className={classes.button} style={{color: imageData ? "green" : ""}}>
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
          color="primary">
            <ClearIcon className="leftIcon"/> Discard
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary">
            Save <SaveIcon className="rightIcon"/> 
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
    height: "20vh"
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
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
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
    marginLeft: 0
  }
});

export default withStyles(styles)(CreatePin);
