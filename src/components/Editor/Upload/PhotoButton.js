import React from "react";
import { Button } from "@material-ui/core";
import InsertPhoto from "@material-ui/icons/InsertPhoto";

const PhotoButton = (props) => {
  const handleChange = (e) => {
    e.persist();
    if (props.handler) {
      props.handler(e);
    }
  };

  return (
    <Button
      disabled={props.disabled}
      startIcon={<InsertPhoto />}
      style={{ borderRight: "1px solid #3f51b5" }}
      color="primary"
      component="label"
    >
      +
      <input onChange={handleChange} type="file" style={{ display: "none" }} />
    </Button>
  );
};

export default PhotoButton;
