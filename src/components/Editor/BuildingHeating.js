import React, { useState, useEffect } from "react";
import { Typography, FormControl, Fade, Paper } from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";

import DropdownSelect from "../reusable/DropdownSelect";

const BuildingHeating = (props) => {
  const {
    setNavigationEnabled,
    setSavedProperty,
    getSavedProperty,
    buildingOptions,
  } = useEditor();

  const [heatingType, setHeatingType] = useState(
    getSavedProperty("heating", "heatingSystem")
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const handleHeatingTypeChange = (value) => {
    setHeatingType(value);
    setSavedProperty("heating", "heatingSystem", value);
  };

  //className={props.style.required}
  return (
    <Fade in={loading}>
      <div className={props.style.root}>
        <Typography className={props.style.header} variant="h5">
          Heating details
        </Typography>
        <div className={props.style.category}>
          <Typography variant="h6">General</Typography>
          <FormControl className={props.style.formControl}>
            <DropdownSelect
              data={buildingOptions.heatingTypes}
              label="Type"
              value={heatingType}
              id="heating-type"
              handler={handleHeatingTypeChange}
            />
          </FormControl>
        </div>
        <div className={props.style.category}>
          <Typography variant="h6">Energy source</Typography>
        </div>
        <div className={props.style.category}>
          <Typography variant="h6">Heat distribution</Typography>
        </div>
        <div className={props.style.category}>
          <Typography variant="h6">Automation</Typography>
        </div>
      </div>
    </Fade>
  );
};

export default BuildingHeating;
