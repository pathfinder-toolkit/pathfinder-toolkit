import React, { useState, useEffect } from "react";

import { Typography, Grid } from "@material-ui/core";

const ImageSelection = (props) => {
  const classes = props.classes;

  return (
    <div className={classes.gridRoot}>
      <div className={classes.gridItem}>1</div>
      <div className={classes.gridItem}>2</div>
      <div className={classes.gridItem}>3</div>
      <div className={classes.gridItem}>4</div>
      <div className={classes.gridItem}>5</div>
      <div className={classes.gridItem}>6</div>
      <div className={classes.gridItem}>7</div>
      <div className={classes.gridItem}>8</div>
    </div>
  );
};

export default ImageSelection;
