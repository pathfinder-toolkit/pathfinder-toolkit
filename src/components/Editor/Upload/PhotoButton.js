import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import InsertPhoto from "@material-ui/icons/InsertPhoto";

const PhotoButton = (props) => {
  const [file, setFile] = useState(
    props.defaultValue ? props.defaultValue : ""
  );
  const handleChange = (e) => {
    e.persist();
    if (props.handler) {
      props.handler(e);
    }
    setFile(e.target.files[0]);
  };

  return (
    <Button
      disabled={props.disabled}
      startIcon={<InsertPhoto />}
      style={{ borderRight: "1px solid #3f51b5" }}
      color="primary"
      component="label"
    >
      {" "}
      +
      <input onChange={handleChange} type="file" style={{ display: "none" }} />
    </Button>
  );
};

export default PhotoButton;
