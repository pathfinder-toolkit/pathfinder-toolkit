import React, { useState, useEffect } from "react";
import { Typography, TextField, Select, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useBackend } from "../../../utils/BackendProvider";
import ImageUpload from "./ImageUpload";
import ImageSelection from "./ImageSelection";

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
    //left: "50%",
    //top: "50%",
    //transform: "translate(-50%,-50%)",
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
  const { requestUserImages } = useBackend();
  const [userImagesLoading, setUserImagesLoading] = useState(true);
  const [userImages, setUserImages] = useState();
  const [imageId, setImageId] = useState("");

  const fetchImages = async () => {
    setUserImagesLoading(true);
    const data = await requestUserImages();
    setUserImages(data);
    console.log(data);
    setUserImagesLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const classes = useStyles();

  const handleImageId = (id) => {
    setImageId(id);
    if (props.handleChange) {
      props.handleChange(id);
    }
  };

  return (
    <div className={classes.root}>
      <Typography align="center" className={classes.header} variant="h5">
        Upload image
      </Typography>
      <ImageUpload
        handler={(id) => handleImageId(id)}
        fetchImages={fetchImages}
        classes={classes}
      />
      <Typography align="center" className={classes.header} variant="h5">
        Select from your images
      </Typography>
      <div className={classes.imageSelection}>
        {!userImagesLoading && (
          <ImageSelection
            handler={(id) => handleImageId(id)}
            images={userImages}
            selectedId={imageId}
            classes={classes}
          />
        )}
      </div>
      <div className={classes.controls}>
        <Typography>Selected image: {imageId}</Typography>
        <div>
          <Button
            disabled={!imageId}
            style={{ marginRight: "0.5em" }}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
          <Button color="secondary" variant="outlined">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadContainer;
