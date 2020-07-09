import React, { useState } from "react";

import { Typography, Button, Grid, CircularProgress } from "@material-ui/core";
import InsertPhoto from "@material-ui/icons/InsertPhoto";
import PhotoButton from "./PhotoButton";

const ImageUpload = (props) => {
  const classes = props.classes;

  const [file, setFile] = useState();
  const [fileLoading, setFileLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileLoading(true);
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
