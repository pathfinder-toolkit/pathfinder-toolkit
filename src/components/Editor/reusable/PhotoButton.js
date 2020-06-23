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
    <React.Fragment>
      <Button
        startIcon={<InsertPhoto />}
        variant="contained"
        color="primary"
        component="label"
      >
        ADD
        <input
          onChange={handleChange}
          type="file"
          style={{ display: "none" }}
        />
      </Button>
      <Typography>{file?.name}</Typography>
    </React.Fragment>
  );
};

export default PhotoButton;
