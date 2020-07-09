import React, { useState, useEffect } from "react";

import { Typography, Grid, Button, IconButton } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const ImageSelection = (props) => {
  const images = props.images;
  const classes = props.classes;

  const ITEMS_PER_PAGE = 8;
  const TOTAL_PAGES = Object.keys(images).length / ITEMS_PER_PAGE;
  //let currentItem = 0;

  const [page, setPage] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [items, setItems] = useState(images.slice(currentItem, ITEMS_PER_PAGE));

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

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <IconButton
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

        {
          <IconButton
            onClick={nextPage}
            disableRipple
            variant=""
            className={classes.navButton}
          >
            <NavigateNextIcon />
          </IconButton>
        }
      </div>
      <Typography>
        page:{page}/{TOTAL_PAGES} current item:{currentItem}
      </Typography>
    </React.Fragment>
  );
};

export default ImageSelection;
