import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Fade,
  Zoom,
  TextField,
  Paper,
  Slider,
  Input,
  FormControl,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

import DropdownSelect from "./reusable/DropdownSelect";
import ClearButton from "./reusable/ClearButton";
import Tip from "./Tip";
import { InsertPhoto } from "@material-ui/icons";

const BuildingDetails = (props) => {
  const {
    setNavigationEnabled,
    getSavedCategory,
    setSavedCategory,
    buildingOptions,
  } = useEditor();

  const style = props.style;

  // Get form data from local storage
  const [formData, setFormData] = useState(getSavedCategory("details"));

  const handleChange = (event, propertyName) => {
    event.persist();

    if (event.target.value < 0) {
      return;
    }

    setFormData((formData) => ({
      ...formData,
      [propertyName]: {
        ...formData[propertyName],
        value: event.target.value,
      },
    }));
  };

  const resetProperty = (propertyName) => {
    console.log("resetting: " + propertyName);
    setFormData((formData) => ({
      ...formData,
      [propertyName]: {
        ...formData[propertyName],
        value: "",
      },
    }));
    console.log(formData);
  };

  // Need a different handler function for the slider,
  // because event doesn't contain the updated value.
  const handleYearChange = (event, newValue) => {
    setFormData((formData) => ({
      ...formData,
      year: {
        ...formData.year,
        value: newValue,
      },
    }));
  };

  // Save form data to local storage
  useTimer(
    () => {
      console.log("saving");
      setSavedCategory("details", formData);
    },
    500,
    [formData]
  );

  const handleFileChange = (event) => {
    event.persist();
    console.log(event.target.files[0]);
    setFormData((formData) => ({
      ...formData,
      image: {
        ...formData.image,
        value: event.target.files[0],
      },
    }));
    console.log(formData);
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(formData);
    setLoading(true);
  }, []);

  return (
    <Fade in={loading}>
      <div className={style.root}>
        <div className={style.header}>
          <Typography variant="h5">Building details</Typography>
        </div>
        <Grid container spacing={3} sm={12} md={12} lg={12}>
          <Grid item sm={8} md={8} lg={8}>
            <div className={style.category}>
              <Grid container className={style.row} spacing={0}>
                <Grid item>
                  <TextField
                    className={style.formComponent}
                    label="Building name *"
                    value={formData.name.value}
                    onChange={(e) => handleChange(e, "name")}
                  />
                </Grid>

                <Grid item>
                  <ClearButton
                    className={style.ClearButton}
                    handler={resetProperty}
                    target="buildingType"
                  />
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.buildingTypes}
                    label="Type"
                    value={formData.buildingType.value}
                    id="type-dropdown"
                    handler={(e) => handleChange(e, "buildingType")}
                  />
                </Grid>
                <Grid item sm={1}>
                  <TextField
                    className={style.formComponent}
                    defaultValue="1"
                    value={formData.floorsAmount.value}
                    label="Floors"
                    type="number"
                    onChange={(e) => handleChange(e, "floorsAmount")}
                  ></TextField>
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="Floor area"
                    className={style.formComponent}
                    value={formData.floorArea.value}
                    error={isNaN(formData.floorArea.value)}
                    helperText={
                      isNaN(formData.floorArea.value) ? "Incorrect entry" : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m²</InputAdornment>
                      ),
                    }}
                    onChange={(e) => handleChange(e, "floorArea")}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="Heated"
                    disabled={!formData.floorArea.value}
                    className={style.formComponent}
                    value={formData.heatedFloorArea.value}
                    error={isNaN(formData.heatedFloorArea.value)}
                    helperText={
                      isNaN(formData.heatedFloorArea.value)
                        ? "Incorrect entry"
                        : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m²</InputAdornment>
                      ),
                    }}
                    onChange={(e) => handleChange(e, "heatedFloorArea")}
                  />
                </Grid>
                <Grid container sm={12} md={12} lg={12}>
                  <Grid item sm={1}></Grid>
                </Grid>
              </Grid>
              <Grid container className={style.row} spacing={0}>
                <Typography variant="subtitle1" gutterBottom>
                  Construction year {formData.year.value}
                </Typography>
                <Slider
                  className={style.slider}
                  marks
                  valueLabelDisplay="on"
                  step={10}
                  defaultValue={1990}
                  marks
                  min={1890}
                  max={2010}
                  value={formData.year.value}
                  onChange={handleYearChange}
                />
              </Grid>
              <Grid container spacing={3} sm={12} md={12} lg={12}>
                <Grid item sm={10}>
                  <TextField
                    className={style.formComponent}
                    id="description"
                    label="Description"
                    multiline
                    fullWidth
                    rows={4}
                    value={formData.description.value}
                    onChange={(e) => handleChange(e, "description")}
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={2}>
                  <Button
                    startIcon={<InsertPhoto />}
                    variant="contained"
                    color="primary"
                    component="label"
                  >
                    Add
                    <input
                      onChange={handleFileChange}
                      type="file"
                      style={{ display: "none" }}
                    />
                  </Button>
                  <Typography>{formData.image.value?.name}</Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid className={style.suggestionContainer} item sm={4} md={4} lg={4}>
            <Tip text="Text" title="Title"></Tip>
            <Tip text="Text" title="Title"></Tip>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingDetails;
