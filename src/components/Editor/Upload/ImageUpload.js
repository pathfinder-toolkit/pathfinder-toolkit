import React, { useState } from "react";

import { Typography, Button, Grid, CircularProgress } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import PhotoButton from "./PhotoButton";

import { useBackend } from "../../../utils/BackendProvider";

const ImageUpload = (props) => {
  const classes = props.classes;

  const [file, setFile] = useState();
  const [fileLoading, setFileLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const { uploadUserImage } = useBackend();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const startUpload = async () => {
    setFileLoading(true);
    const data = await uploadUserImage(file);
    setFileUploaded(true);
    if (props.fetchImages) {
      props.fetchImages();
    }
    if (props.handler) {
      props.handler(data);
    }
    setFileLoading(false);
  };

  return (
    <div>
      <Grid className={classes.uploader} container alignItems="center">
        <PhotoButton
          disabled={fileUploaded}
          handler={(e) => handleFileChange(e)}
        />
        <Typography variant="body2">{file?.name}</Typography>
        {file && !fileLoading && !fileUploaded && (
          <Button
            disabled={fileUploaded}
            onClick={startUpload}
            color="primary"
            variant="outlined"
          >
            upload
          </Button>
        )}{" "}
        {fileLoading && <CircularProgress style={{ padding: "5px" }} />}
        {file && fileUploaded && <DoneIcon color="primary" />}
      </Grid>
    </div>
  );
};

export default ImageUpload;
