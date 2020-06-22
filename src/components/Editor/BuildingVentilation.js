import React, { useState, useEffect } from "react";
import { Typography, FormControl, Fade, Paper } from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

import DropdownSelect from "./reusable/DropdownSelect";

const BuildingVentilation = (props) => {
  const {
    setNavigationEnabled,
    getSavedCategory,
    setSavedCategory,
    buildingOptions,
  } = useEditor();

  const [formData, setFormData] = useState(getSavedCategory("ventilation"));

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
      setSavedCategory("ventilation", formData);
    },
    500,
    [formData]
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <Fade in={loading}>
      <div className={props.style.root}>
        <Typography className={props.style.header} variant="h5">
          Ventilation details
        </Typography>

        <Paper className={props.style.category}>
          <Typography variant="h6">General</Typography>
          <FormControl className={props.style.formControl}>
            <DropdownSelect
              data={buildingOptions.ventilationTypes}
              label="Type"
              value={formData.ventilationSystem.value}
              id="ventilation-type"
              handler={(e) => handleChange(e, "ventilationSystem")}
            />
          </FormControl>
        </Paper>
        <Paper className={props.style.category}>
          <Typography variant="h6">Airtightness</Typography>
        </Paper>
        <Paper className={props.style.category}>
          <Typography variant="h6">Air vents</Typography>
        </Paper>
      </div>
    </Fade>
  );
};

export default BuildingVentilation;
