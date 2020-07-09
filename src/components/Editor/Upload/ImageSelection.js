import React, { useState, useEffect } from "react";

import { Typography, Grid, Button, IconButton, Zoom } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const ImageSelection = (props) => {
  const images = props.images;
  const classes = props.classes;

  const ITEMS_PER_PAGE = 8;
  const TOTAL_ITEMS = Object.keys(images).length;
  const TOTAL_PAGES = TOTAL_ITEMS / ITEMS_PER_PAGE;
  //let currentItem = 0;

  const [page, setPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(0);
  const [items, setItems] = useState(images.slice(currentItem, ITEMS_PER_PAGE));

  const [transition, setTransition] = useState(false);

  const nextPage = () => {
    setPage(page + 1);
    //currentItem = currentItem + ITEMS_PER_PAGE;
    setCurrentItem(currentItem + ITEMS_PER_PAGE);
    console.log("current item: " + currentItem);

    setItems(images.slice(currentItem, currentItem + ITEMS_PER_PAGE));
  };

  const previousPage = () => {
    setPage(page - 1);
    //currentItem = currentItem - ITEMS_PER_PAGE;
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
    setTransition(false);
  }, page);

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
          {items.map((item, index) => (
            <img
              src={item.image}
              alt={item.date}
              className={classes.gridItem}
              onClick={() => selectImage(item.image)}
            ></img>
          ))}
        </div>

        <IconButton
          disabled={page >= TOTAL_PAGES}
          onClick={nextPage}
          disableRipple
          variant=""
          className={classes.navButton}
        >
          <NavigateNextIcon />
        </IconButton>
      </div>
      <Typography align="center">
        {page}/{TOTAL_PAGES}
      </Typography>
    </React.Fragment>
  );
};

const GridItem = (props) => {};

export default ImageSelection;
