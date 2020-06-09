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

const BuildingVentilation = () => {
  const classes = useStyles();
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
      <div className={classes.root}>
        <Typography className={classes.header} variant="h5">
          Ventilation details
        </Typography>

        <Paper className={classes.category}>
          <Typography variant="h6">System</Typography>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              className={classes.required}
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
        <Paper className={classes.category}>
          <Typography variant="h6">Airtightness</Typography>
        
        </Paper>
      </div>
    </Fade>
  );
};

export default BuildingVentilation;
