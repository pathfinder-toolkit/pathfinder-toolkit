import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Grid,
  Button,
  Fade,
  Paper,
} from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  category: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
}));

const BuildingHeating = () => {
  const classes = useStyles();
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

  useEffect(() => {
    if (buildingInformation.heating.system) {
      setNavigationEnabled(true);
    }
  }, [buildingInformation.heating]);

  return (
    <Fade in={loading}>
      <div className={classes.root}>
        <Typography className={classes.header} variant="h5">
          Heating details
        </Typography>
        <Paper className={classes.category}>
          <Typography variant="h6">General</Typography>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              className={classes.required}
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
        <Paper className={classes.category}>
          <Typography variant="h6">Energy source</Typography>
        </Paper>
        <Paper className={classes.category}>
          <Typography variant="h6">Heat distribution</Typography>
        </Paper>
        <Paper className={classes.category}>
          <Typography variant="h6">Automation</Typography>
        </Paper>
      </div>
    </Fade>
  );
};

export default BuildingHeating;
