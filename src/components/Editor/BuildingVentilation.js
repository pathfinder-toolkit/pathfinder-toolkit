import React, { useState, useEffect } from "react";
import { Typography, FormControl, Fade, Paper } from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";

import DropdownSelect from "../reusable/DropdownSelect";

const BuildingVentilation = (props) => {
  const {
    setNavigationEnabled,
    setSavedProperty,
    getSavedProperty,
    buildingOptions,
  } = useEditor();

  const [ventilationType, setVentilationType] = useState(
    getSavedProperty("ventilation", "ventilationSystem")
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const handleVentilationTypeChange = (value) => {
    setVentilationType(value);
    setSavedProperty("ventilation", "ventilationSystem", value);
  };

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
              value={ventilationType}
              id="ventilation-type"
              handler={handleVentilationTypeChange}
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
