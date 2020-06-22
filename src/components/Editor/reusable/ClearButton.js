import React from "react";
import { IconButton } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";

const ClearButton = (props) => {
  return (
    <IconButton size="small" className={props.className} edge="end" onClick={() => props.handler(props.target)}>
      <Clear color="error" />
    </IconButton>
  );
};

export default ClearButton;
