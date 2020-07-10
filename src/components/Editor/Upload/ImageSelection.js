import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { Typography, IconButton, Zoom } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import CloudinaryContext from "cloudinary-react/lib/components/CloudinaryContext";
import { Image } from "cloudinary-react";

const ImageSelection = (props) => {
  // Sort images by recently uploaded
  const images = props.images.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  );
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
  };

  const previousPage = () => {
    setPage(page - 1);
    setCurrentItem(currentItem - ITEMS_PER_PAGE);
  };

  // Update elements of page switch
  useEffect(() => {
    setItems(images.slice(currentItem, currentItem + ITEMS_PER_PAGE));
  }, [currentItem]);

  const selectImage = (publicId) => {
    if (props.handler) {
      props.handler(publicId);
    }
  };

  useEffect(() => {
    setTransition(true);
  }, []);

  if (images.length === 0) {
    return (
      <Typography style={{ padding: "2em" }} align="center">
        No user images found.
      </Typography>
    );
  }

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
                  className={
                    item.publicId === props.selectedId
                      ? clsx(classes.gridItem, classes.selected)
                      : classes.gridItem
                  }
                  onClick={() => selectImage(item)}
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

const GridItem = (props) => {};

export default ImageSelection;
