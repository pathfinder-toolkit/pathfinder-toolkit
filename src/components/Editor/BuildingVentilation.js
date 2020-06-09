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

const BuildingVentilation = (props) => {
  const [ventilationTypeOpen, setVentilationTypeOpen] = useState(false);
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

  const handleVentilationTypeChange = (event) => {
    setVentilationType(event.target.value);
    setSavedVentilationType(event.target.value);
  };

  const handleClose = () => {
    setVentilationTypeOpen(false);
  };

  const handleVentilationOpen = () => {
    setVentilationTypeOpen(true);
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
            <InputLabel>Type</InputLabel>
            <Select
              className={props.style.required}
              open={ventilationTypeOpen}
              onClose={handleClose}
              onOpen={handleVentilationOpen}
              value={ventilationType}
              onChange={handleVentilationTypeChange}
            >
              <MenuItem value=""></MenuItem>
              {ventilationSystems.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
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
