import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Fade,
  TextField,
  Paper,
  Slider,
  InputAdornment,
  Input,
  FormControl,
  Button,
} from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

import DropdownSelect from "../reusable/DropdownSelect";
import Tip from "./Tip";
import IncrementValue from "./IncrementValue";

const BuildingDetails = (props) => {
  const {
    setNavigationEnabled,
    activeStep,
    getSavedCategory,
    setSavedCategory,
    buildingOptions,
  } = useEditor();

  const [formData, setFormData] = useState(getSavedCategory("details"));

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
      setSavedCategory("details", formData);
    },
    15000,
    [formData]
  );

  useEffect(() => {
    console.log("sSAVING");
    setSavedCategory("details", formData);
  }, [activeStep]);

  const handleYearChange = (event, newValue) => {};

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <Fade in={loading}>
      <div className={props.style.root}>
        <div className={props.style.header}>
          <Typography variant="h5">Building details</Typography>
        </div>
        <Grid container spacing={4} sm={12} md={12} lg={12}>
          <Grid item sm={8} md={8} lg={8}>
            <div className={props.style.category}>
              <Grid container className={props.style.row} spacing={0}>
                <Grid item>
                  <TextField
                    className={props.style.formComponent}
                    label="Building name"
                    value={formData.name.value}
                    onChange={(e) => handleChange(e, "name")}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="Floor area"
                    className={props.style.formComponent}
                    value={formData.floorArea.value}
                    onChange={(e) => handleChange(e, "floorArea")}
                    //InputProps={{
                    // startAdornment: (
                    //  <InputAdornment position="end">m2</InputAdornment>
                    //),
                    //}}
                  />
                </Grid>
                <Grid item>
                  <DropdownSelect
                    className={props.style.formComponent}
                    data={buildingOptions.buildingTypes}
                    label="Type"
                    value={formData.buildingType.value}
                    id="type-dropdown"
                    handler={(e) => handleChange(e, "buildingType")}
                  />
                </Grid>
                <Grid item>
                  <DropdownSelect
                    className={props.style.formComponent}
                    data={buildingOptions.materials}
                    label="Material"
                    value={formData.material.value}
                    id="material-dropdown"
                    handler={(e) => handleChange(e, "material")}
                  />
                </Grid>
              </Grid>
              <Grid container className={props.style.row} spacing={0}>
                <Slider
                  className={props.style.slider}
                  marks
                  valueLabelDisplay="auto"
                  step={10}
                  defaultValue={1990}
                  marks
                  min={1890}
                  max={2010}
                  value={formData.year.value}
                  onChange={handleYearChange}
                />
                <Typography variant="subtitle1" gutterBottom>
                  Construction year {formData.year.value}
                </Typography>
              </Grid>

              <Typography variant="h6">Floors</Typography>
              <TextField
                size="small"
                value={formData.floorsAmount.value}
                type="number"
                onChange={(e) => handleChange(e, "floorsAmount")}
              >
                Count
              </TextField>
              <Grid container className={props.style.controls}>
                <IncrementValue value={formData.floorsAmount.value} />
              </Grid>
            </div>
          </Grid>
          <Grid
            className={props.style.suggestionContainer}
            item
            sm={4}
            md={4}
            lg={4}
          >
            <Tip text="Text" title="Title"></Tip>
            <Tip text="Text" title="Title"></Tip>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingDetails;
