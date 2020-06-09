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

const BuildingHeating = (props) => {
  const [heatingTypeOpen, setHeatingTypeOpen] = useState(false);
  const [heatingType, setHeatingType] = useState("");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const { getHeatingTypes } = useBackend();

  const {
    buildingInformation,
    setNavigationEnabled,
    setSavedHeatingType,
  } = useEditor();

  const heatingTypes = getHeatingTypes();

  const handleHeatingTypeChange = (event) => {
    setHeatingType(event.target.value);
    setSavedHeatingType(event.target.value);
  };

  const handleClose = () => {
    setHeatingTypeOpen(false);
  };

  const handleHeatingTypeOpen = () => {
    setHeatingTypeOpen(true);
  };

  return (
    <Fade in={loading}>
      <div className={props.style.root}>
        <Typography className={props.style.header} variant="h5">
          Heating details
        </Typography>
        <Paper className={props.style.category}>
          <Typography variant="h6">General</Typography>
          <FormControl className={props.style.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              className={props.style.required}
              open={heatingTypeOpen}
              onClose={handleClose}
              onOpen={handleHeatingTypeOpen}
              value={heatingType}
              onChange={handleHeatingTypeChange}
            >
              <MenuItem value=""></MenuItem>
              {heatingTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper className={props.style.category}>
          <Typography variant="h6">Energy source</Typography>
        </Paper>
        <Paper className={props.style.category}>
          <Typography variant="h6">Heat distribution</Typography>
        </Paper>
        <Paper className={props.style.category}>
          <Typography variant="h6">Automation</Typography>
        </Paper>
      </div>
    </Fade>
  );
};

export default BuildingHeating;
