import React, { useState, useEffect } from "react";

import { Typography, Grid, IconButton, Zoom } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import { Image } from "cloudinary-react";
import CloudinaryContext from "cloudinary-react/lib/components/CloudinaryContext";

const ImageSelection = (props) => {
  const images = props.images;
  console.log(images);
  const classes = props.classes;

  const ITEMS_PER_PAGE = 8;
  const TOTAL_ITEMS = Object.keys(images).length;
  const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const [page, setPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(0);
  const [items, setItems] = useState(images.slice(currentItem, ITEMS_PER_PAGE));

  const [transition, setTransition] = useState(false);

  const nextPage = () => {
    setPage(page + 1);
    setCurrentItem(currentItem + ITEMS_PER_PAGE);
    setItems(images.slice(currentItem, currentItem + ITEMS_PER_PAGE));
  };

  const previousPage = () => {
    setPage(page - 1);
    setCurrentItem(currentItem - ITEMS_PER_PAGE);
    setItems(images.slice(currentItem, currentItem + ITEMS_PER_PAGE));
  };

  const selectImage = (image) => {
    console.log("selected: " + image);
    if (props.handler) {
      props.handler(image);
    }
  };

  useEffect(() => {
    setTransition(true);
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <IconButton
          disabled={page === 1}
          onClick={previousPage}
          disableRipple
          variant=""
          className={classes.navButton}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <div className={classes.gridRoot}>
          <CloudinaryContext
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
          >
            {items.map((item, index) => (
              <Zoom in={transition}>
                <Image
                  publicId={item.publicId}
                  className={classes.gridItem}
                  onClick={() => selectImage(item.publicId)}
                ></Image>
              </Zoom>
            ))}
          </CloudinaryContext>
        </div>

        <IconButton
          style={{ marginLeft: "auto" }}
          disabled={page >= TOTAL_PAGES}
          onClick={nextPage}
          disableRipple
          variant=""
          className={classes.navButton}
        >
          <NavigateNextIcon />
        </IconButton>
      </div>
      <Typography
        style={{ paddingRight: "1em" }}
        align="center"
        variant="subtitle1"
      >
        pages:{page}/{TOTAL_PAGES} items:{currentItem}/{TOTAL_ITEMS}
      </Typography>
    </React.Fragment>
  );
};

export default ImageSelection;
