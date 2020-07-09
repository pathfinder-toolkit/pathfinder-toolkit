import React, { useState } from "react";

import { Typography, Button, Grid, CircularProgress } from "@material-ui/core";
import InsertPhoto from "@material-ui/icons/InsertPhoto";
import PhotoButton from "./PhotoButton";

import { useBackend } from "../../../utils/BackendProvider";

const ImageUpload = (props) => {
  const classes = props.classes;

  const [file, setFile] = useState();
  const [fileLoading, setFileLoading] = useState(false);

  const { uploadUserImage } = useBackend();

  const handleFileChange = async (e) => {
    if (!fileLoading) {
      //setFile(e.target.files[0]);
      //console.log(e);
      setFileLoading(true);
      await uploadUserImage(e.target.files[0]);
    }
  };

  return (
    <div>

      <Grid className={classes.uploader} container alignItems="center">
        <PhotoButton handler={(e) => handleFileChange(e)} />
        <Typography variant="body2">{file?.name}</Typography>
        {fileLoading && <CircularProgress />}
      </Grid>
    </div>
  );
};

export default ImageUpload;
