import React, { useState, useEffect } from "react";
import { Typography, TextField, Select, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  gridItem: {
    border: "1px solid #3F51B5",
    borderRadius: "3px",
    width: "10em",
    height: "10em",
    marginRight: "1em",
    marginBottom: "1em",
    cursor: "pointer",
  },
}));

const UploadContainer = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align="center" className={classes.header} variant="h5">
        Upload building image
      </Typography>
      <ImageUpload classes={classes} />
      <Typography align="center" className={classes.header} variant="h5">
        Select from your images
      </Typography>
      <div>
        <ImageSelection classes={classes} />
      </div>
    </div>
  );
};

export default UploadContainer;
