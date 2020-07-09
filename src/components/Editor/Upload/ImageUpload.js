import React, { useState } from "react";

import { Typography, Button, Grid, CircularProgress } from "@material-ui/core";
import InsertPhoto from "@material-ui/icons/InsertPhoto";
import PhotoButton from "./PhotoButton";

import { useBackend } from "../../../utils/BackendProvider";

const ImageUpload = (props) => {
  const classes = props.classes;

  const [file, setFile] = useState();
  const [fileLoading, setFileLoading] = useState(false);
  const [newImageId, setNewImageId] = useState();

  const { 
    uploadUserImage
  } = useBackend();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const startUpload = async () => {
    setFileLoading(true);
    const data = await uploadUserImage(file);
    setNewImageId(data.publicId);
    setFileLoading(false);
  };

  return (
    <div>
      <Grid className={classes.uploader} container alignItems="center">
        <PhotoButton handler={(e) => handleFileChange(e)} />
        <Typography variant="body2">{file?.name}</Typography>
        {file && !fileLoading && (
          <Button onClick={startUpload} color="primary" variant="outlined">
            upload
          </Button>
        )}{" "}
        {fileLoading && <CircularProgress style={{ padding: "5px" }} />}
      </Grid>
    </div>
  );
};

export default ImageUpload;
