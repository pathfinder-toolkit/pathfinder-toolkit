import React, { useState, useEffect } from "react";
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Fade,
  Paper,
} from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";

import DropdownSelect from "./DropdownSelect";

const BuildingVentilation = (props) => {
  const [ventilationType, setVentilationType] = useState("");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const { getVentilationTypes } = useBackend();

  const {
    buildingInformation,
    setNavigationEnabled,
    setSavedVentilationType,
  } = useEditor();

  const ventilationSystems = getVentilationTypes();

  const handleVentilationTypeChange = (value) => {
    setVentilationType(value);
    setSavedVentilationType(value);
  };

  useEffect(() => {
    if (buildingInformation.ventilation.system) {
      setNavigationEnabled(true);
    }
  }, [buildingInformation.ventilation]);

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
              data={ventilationSystems}
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
