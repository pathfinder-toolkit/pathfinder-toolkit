import React, { useState } from "react";
import { Select, MenuItem, InputLabel, TextField } from "@material-ui/core";

const DropdownSelect = (props) => {
  const value = props.value ? props.value : "";
  const data = props.data;
  const label = props.label;
  const id = props.id ? props.id : "empty";
  const className = props.className ? props.className : "";

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(value);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelection(event.target.value);
    if (props.handler) {
      props.handler(event);
    }
  };

  return (
    <React.Fragment>
      <TextField
        label={label}
        id={id}
        open={open}
        select
        className={className}
        onClose={handleClose}
        onOpen={handleOpen}
        value={selection}
        onChange={handleChange}
      >
        {data.map((entry, index) => (
          <MenuItem key={index} value={entry}>
            {entry}
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  );
};

export default DropdownSelect;
