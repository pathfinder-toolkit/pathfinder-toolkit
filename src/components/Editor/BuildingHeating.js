import React, { useState, useEffect } from "react";
import { Typography, FormControl, Fade, Paper } from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

import DropdownSelect from "../reusable/DropdownSelect";

const BuildingHeating = (props) => {
  const {
    setNavigationEnabled,
    getSavedCategory,
    setSavedCategory,
    buildingOptions,
  } = useEditor();

  const [formData, setFormData] = useState(getSavedCategory("heating"));

  const handleChange = (event, propertyName) => {
    event.persist();
    setFormData((formData) => ({
      ...formData,
      [propertyName]: {
        ...formData[propertyName],
        value: event.target.value,
      },
    }));
  };

  // Save form data to local storage
  useTimer(
    () => {
      console.log("saving");
      setSavedCategory("heating", formData);
    },
    15000,
    [formData]
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

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
              value={formData.heatingSystem.value}
              id="heating-type"
              handler={(e) => handleChange(e, "heatingSystem")}
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
