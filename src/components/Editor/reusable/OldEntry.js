import React, { useState, useEffect } from "react";
import { Typography, TextField } from "@material-ui/core";
import DropdownSelect from "./DropdownSelect";

const OldEntry = (props) => {
  const [changeYear, setChangeYear] = useState();

  const handleYearChange = (event) => {
    setChangeYear(event.target.value);
  };

  const label = props.label;
  const data = props.data

  return (
    <React.Fragment>
      <DropdownSelect label="Old data" data={data} />
      <TextField onChange={handleYearChange} label="Year"></TextField>
    </React.Fragment>
  );
};

export default OldEntry;
