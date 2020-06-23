import React, { useState } from "react";
import { MenuItem, TextField } from "@material-ui/core";

const DropdownSelect = (props) => {
  const value = props.value ? props.value : "";
  const data = props.data;
  const label = props.label;
  const id = props.id ? props.id : "empty";
  const className = props.className ? props.className : "";
  const defaultValue = props.defaultValue ? props.defaultValue : "";

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
    <TextField
      label={label}
      open={open}
      select
      fullWidth
      className={className}
      onClose={handleClose}
      onOpen={handleOpen}
      value={selection}
      defaultValue={defaultValue}
      onChange={handleChange}
    >
      {data.map((entry, index) => (
        <MenuItem key={index} value={entry}>
          {entry}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DropdownSelect;
