import React, { useState, useEffect } from "react";

import { Typography, Grid, IconButton, Zoom } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const ImageSelection = (props) => {
  const images = props.images;
  const classes = props.classes;

  const ITEMS_PER_PAGE = 8;
  const TOTAL_ITEMS = Object.keys(images).length;
  const TOTAL_PAGES = TOTAL_ITEMS / ITEMS_PER_PAGE;

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
          {items.map((item, index) => (
            <Zoom in={transition}>
              <img
                src={item.image}
                alt={item.date}
                className={classes.gridItem}
                onClick={() => selectImage(item.image)}
              ></img>
            </Zoom>
          ))}
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
        {page}/{TOTAL_PAGES}
      </Typography>
    </React.Fragment>
  );
};

export default ImageSelection;
