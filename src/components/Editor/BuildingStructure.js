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
  TextField,
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

const BuildingStructure = () => {
  const classes = useStyles();
  const [wallOpen, setWallOpen] = useState(false);
  const [roofOpen, setRoofOpen] = useState(false);
  const [wallMaterial, setWallMaterial] = useState("");
  const [roofType, setRoofType] = useState("");
  const [windowCount, setWindowCount] = useState(0);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const { getMaterials, getRoofTypes } = useBackend();

  const {
    buildingInformation,
    setSavedWallMaterial,
    setSavedRoofType,
    setSavedWindowCount,
    setNavigationEnabled,
  } = useEditor();
  const materials = getMaterials();
  const roofs = getRoofTypes();

  const handleMaterialChange = (event) => {
    setWallMaterial(event.target.value);
    setSavedWallMaterial(event.target.value);
  };

  const handleRoofChange = (event) => {
    setRoofType(event.target.value);
    setSavedRoofType(event.target.value);
  };

  const handleWindowChange = (event) => {
    if (event.target.value < 0 || isNaN(event.target.value)) {
      return
    }
    setWindowCount(event.target.value);
    setSavedWindowCount(event.target.value);
  };

  const handleClose = () => {
    setWallOpen(false);
    setRoofOpen(false);
  };

  const handleWallOpen = () => {
    setWallOpen(true);
  };

  const handleRoofOpen = () => {
    setRoofOpen(true);
  };

  useEffect(() => {
    if (
      buildingInformation.structure.wallMaterial &&
      buildingInformation.structure.roofType &&
      buildingInformation.structure.windowCount
    ) {
      setNavigationEnabled(true);
    }
  }, [buildingInformation.structure]);

  //Just a quick sketch, will be split into smaller components/remade later
  return (
    <Fade in={loading}>
      <div className={classes.root}>
        <Typography className={classes.header} variant="h5">
          Structure details
        </Typography>
        <Paper className={classes.category}>
          <Typography variant="h6">Walls</Typography>
          <FormControl className={classes.formControl}>
            <InputLabel id="material-test">Material</InputLabel>
            <Select
              labelId="material-test"
              id="material-test"
              className={classes.required}
              open={wallOpen}
              onClose={handleClose}
              onOpen={handleWallOpen}
              value={wallMaterial}
              onChange={handleMaterialChange}
            >
              <MenuItem value=""></MenuItem>
              {materials.map((material, index) => (
                <MenuItem key={index} value={material}>
                  {material}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper className={classes.category}>
          <Typography variant="h6">Roof</Typography>
          <FormControl className={classes.formControl}>
            <InputLabel id="material-test">Type</InputLabel>
            <Select
              labelId="material-test"
              id="material-test"
              className={classes.required}
              open={roofOpen}
              onClose={handleClose}
              onOpen={handleRoofOpen}
              value={roofType}
              onChange={handleRoofChange}
            >
              <MenuItem value=""></MenuItem>
              {roofs.map((roof, index) => (
                <MenuItem key={index} value={roof}>
                  {roof}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper className={classes.category}>
          <Typography variant="h6">Windows</Typography>
          <TextField size="small" variant="filled" value={windowCount} type="number" onChange={handleWindowChange}>
            Count
          </TextField>
        </Paper>
      </div>
    </Fade>
  );
};

export default BuildingStructure;
