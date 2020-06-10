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

const BuildingHeating = (props) => {
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

  const handleHeatingTypeChange = (value) => {
    setHeatingType(value);
    setSavedHeatingType(value);
  };

  useEffect(() => {
    if (buildingInformation.heating.system) {
      setNavigationEnabled(true);
    }
  }, [buildingInformation.heating]);

  //className={props.style.required}
  return (
    <Fade in={loading}>
      <div className={props.style.root}>
        <Typography className={props.style.header} variant="h5">
          Heating details
        </Typography>
        <Paper className={props.style.category}>
          <Typography variant="h6">General</Typography>
          <FormControl className={props.style.formControl}>
            <DropdownSelect
              data={heatingTypes}
              label="Type"
              value={heatingType}
              id="heating-type"
              handler={handleHeatingTypeChange}
            />
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
