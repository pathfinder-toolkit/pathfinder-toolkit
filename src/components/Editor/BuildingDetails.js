import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Fade,
  TextField,
  Paper,
  Slider,
  Input,
  FormControl,
  Button,
  InputAdornment,
} from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

import DropdownSelect from "../reusable/DropdownSelect";
import Tip from "./Tip";
import IncrementValue from "./IncrementValue";

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
    setFormData((formData) => ({
      ...formData,
      [propertyName]: {
        ...formData[propertyName],
        value: event.target.value,
      },
    }));
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

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <Fade in={loading}>
      <div className={style.root}>
        <div className={style.header}>
          <Typography variant="h5">Building details</Typography>
        </div>
        <Grid container spacing={4} sm={12} md={12} lg={12}>
          <Grid item sm={8} md={8} lg={8}>
            <div className={style.category}>
              <Grid container className={style.row} spacing={0}>
                <Grid item>
                  <TextField
                    className={style.formComponent}
                    label="Building name"
                    value={formData.name.value}
                    onChange={(e) => handleChange(e, "name")}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="Floor area"
                    className={style.formComponent}
                    value={formData.floorArea.value}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m2</InputAdornment>
                      ),
                    }}
                    onChange={(e) => handleChange(e, "floorArea")}
                  />
                </Grid>
                <Grid item>
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.buildingTypes}
                    label="Type"
                    value={formData.buildingType.value}
                    id="type-dropdown"
                    handler={(e) => handleChange(e, "buildingType")}
                  />
                </Grid>
                <Grid item>
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.materials}
                    label="Material"
                    value={formData.material.value}
                    id="material-dropdown"
                    handler={(e) => handleChange(e, "material")}
                  />
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

              <Typography variant="h6">Floors</Typography>
              <TextField
                size="small"
                value={formData.floorsAmount.value}
                type="number"
                onChange={(e) => handleChange(e, "floorsAmount")}
              >
                Count
              </TextField>
              <Grid container className={style.controls}>
                <IncrementValue value={formData.floorsAmount.value} />
              </Grid>
              <TextField
                id="description"
                label="Description"
                multiline
                fullWidth
                rows={4}
                value={formData.description.value}
                onChange={(e) => handleChange(e, "description")}
                variant="outlined"
              />
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
