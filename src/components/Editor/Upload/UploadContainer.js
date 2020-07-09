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
    justifyContent: "center",
  },
  navButton: {
    height: "5em",
    width: "1em",
    alignSelf: "center",
    //left: "50%",
    //top: "50%",
    //transform: "translate(-50%,-50%)",
  },
  gridItem: {
    border: "1px solid #3F51B5",
    borderRadius: "3px",
    width: "10em",
    height: "10em",
    marginRight: "1em",
    marginBottom: "1em",
    cursor: "pointer",
    "&:hover": {
      border: "1px solid #3F51B5",
    },
  },
}));

const UploadContainer = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const classes = useStyles();

  const handleImageUrl = (url) => {
    console.log("handleImageUrl: " + url);
    setImageUrl(url);
    if (props.handler) {
      props.handler(url);
    }
  };

  const mockImages = [
    {
      image: "https://picsum.photos/200",
      date: "02-02-2020",
    },
    {
      image: "https://picsum.photos/300",
      date: "03-02-2020",
    },
    {
      image: "https://picsum.photos/400",
      date: "04-02-2020",
    },
    {
      image: "https://picsum.photos/220",
      date: "06-02-2020",
    },
    {
      image: "https://picsum.photos/210",
      date: "01-02-2020",
    },
    {
      image: "https://picsum.photos/214",
      date: "01-02-2020",
    },
    {
      image: "https://picsum.photos/216",
      date: "01-02-2020",
    },
    {
      image: "https://picsum.photos/215",
      date: "01-02-2020",
    },
    {
      image: "https://picsum.photos/201",
      date: "02-02-2020",
    },
    {
      image: "https://picsum.photos/301",
      date: "03-02-2020",
    },
    {
      image: "https://picsum.photos/401",
      date: "04-02-2020",
    },
    {
      image: "https://picsum.photos/221",
      date: "06-02-2020",
    },
    {
      image: "https://picsum.photos/211",
      date: "01-02-2020",
    },
    {
      image: "https://picsum.photos/211",
      date: "01-02-2020",
    },
    {
      image: "https://picsum.photos/212",
      date: "01-02-2020",
    },
    {
      image: "https://picsum.photos/266",
      date: "01-02-2020",
    },
  ];

  return (
    <div className={classes.root}>
      <Typography align="center" className={classes.header} variant="h5">
        Upload building image
      </Typography>
      <ImageUpload classes={classes} />
      <Typography align="center" className={classes.header} variant="h5">
        Select from your images
      </Typography>
      <div className={classes.imageSelection}>
        <ImageSelection
          handler={(image) => handleImageUrl(image)}
          images={mockImages}
          classes={classes}
        />
      </div>
      <div className={classes.controls}>
        <Typography>Selected image: {imageUrl}</Typography>
        <div>
          <Button
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
