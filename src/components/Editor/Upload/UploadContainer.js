import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useBackend } from "../../../utils/BackendProvider";
import ImageUpload from "./ImageUpload";
import ImageSelection from "./ImageSelection";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: theme.palette.background.default,
    flexDirection: "column",
    padding: "50px",
  },
  header: {
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderBottom: "1px solid #E0E0E0",
  },
  uploader: {
    border: "1px solid #3F51B5",
    borderRadius: "3px",
    justifyContent: "space-between",
  },
  imageSelection: {
    borderBottom: "1px solid #E0E0E0",
  },
  controls: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  navButton: {
    height: "1em",
    width: "1em",
    alignSelf: "center",
  },
  gridItem: {
    border: "1px solid black",
    borderRadius: "3px",
    width: "10em",
    height: "10em",
    marginRight: "1em",
    marginBottom: "1em",
    cursor: "pointer",
  },
  selected: {
    border: "2px solid #3F51B5",
  },
}));

const UploadContainer = (props) => {
  const { requestUserImages, requestImageDeletion } = useBackend();
  const [userImagesLoading, setUserImagesLoading] = useState(true);
  const [userImages, setUserImages] = useState();
  const [image, setImage] = useState();

  const [deleteWarning, setDeleteWarning] = useState(false);

  const fetchImages = async () => {
    setUserImagesLoading(true);
    const data = await requestUserImages();
    setUserImages(data);
    setUserImagesLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const classes = useStyles();

  const handleImage = (item) => {
    setDeleteWarning(false);
    // If user clicks same image again, deselect
    if (item.publicId === image?.publicId) {
      setImage();
      if (props.handleChange) {
        props.handleChange("");
      }
    } else {
      setImage(item);
      if (props.handleChange) {
        props.handleChange(item.publicId);
      }
    }
  };

  const handleDeletion = async (id) => {
    try {
      await requestImageDeletion(id);
      setImage();
      fetchImages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography align="center" className={classes.header} variant="h5">
        Upload image
      </Typography>
      <ImageUpload
        handler={(id) => handleImage(id)}
        fetchImages={fetchImages}
        classes={classes}
      />
      <Typography align="center" className={classes.header} variant="h5">
        Select from your images
      </Typography>
      <div className={classes.imageSelection}>
        {!userImagesLoading && (
          <ImageSelection
            handler={(id) => handleImage(id)}
            images={userImages}
            selectedId={image?.publicId}
            classes={classes}
          />
        )}
      </div>
      <div className={classes.controls}>
        <Button
          variant="outlined"
          disabled={!image}
          onClick={
            !deleteWarning
              ? () => setDeleteWarning(true)
              : () => handleDeletion(image.idImage)
          }
          variant="outlined"
          color="secondary"
        >
          <DeleteIcon />
        </Button>
        {/*deleteWarning && (
          <Button variant="outlined" onClick={() => setDeleteWarning(false)}>
            Cancel
          </Button>
        )*/}
        <div>
          <Button
            disabled={!image}
            onClick={() => props.handleClose()}
            style={{ marginRight: "0.5em" }}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
          <Button
            onClick={() => props.handleClose()}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
        </div>
      </div>
      {deleteWarning && (
        <React.Fragment>
          <Typography variant="subtitle2">Are you sure?</Typography>
        </React.Fragment>
      )}
    </div>
  );
};

export default UploadContainer;
