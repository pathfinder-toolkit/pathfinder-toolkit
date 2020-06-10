import React, { useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";

const DropdownSelect = (props) => {
  const value = props.value ? props.value : "";
  const data = props.data;
  const label = props.label;
  const id = props.id ? props.id : "empty";

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
      props.handler(event.target.value);
    }
  };

  return (
    <React.Fragment>
      <InputLabel id={id} />
      {label}
      <Select
        labelId={id}
        id={id}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={selection}
        onChange={handleChange}
      >
        <MenuItem value=""></MenuItem>
        {data.map((entry, index) => (
          <MenuItem key={index} value={entry}>
            {entry}
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
};

export default DropdownSelect;
