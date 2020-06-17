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

import DropdownSelect from "../reusable/DropdownSelect";
import Tip from "./Tip";
import IncrementValue from "./IncrementValue";
import useHandler from "./useHandler";

const BuildingDetails = (props) => {
  const {
    setSavedProperty,
    getSavedProperty,
    setNavigationEnabled,
    buildingOptions,
  } = useEditor();

  const { values, handleChange } = useHandler();

  const [materialValue, setMaterialValue] = useState();
  const [nameValue, setNameValue] = useState(
    getSavedProperty("details", "name")
  );
  const [buildingYear, setBuildingYear] = useState(
    getSavedProperty("details", "year")
  );
  const [buildingType, setBuildingType] = useState();
  const [floorArea, setFloorArea] = useState(
    getSavedProperty("details", "floorArea")
  );
  const [buildingFloors, setBuildingFloors] = useState(
    getSavedProperty("details", "floorsAmount")
  );

  const handleMaterialChange = (value) => {
    setMaterialValue(value);
  };


  const handleBuildingTypeChange = (event) => {
    //setBuildingType(event.target.value);
  };

  const handleFloorAreaChange = (event) => {
    setFloorArea(event.target.value);
    setSavedProperty("details", "floorArea", event.target.value);
  };

  const handleYearChange = (event, newValue) => {
    setBuildingYear(newValue);
    setSavedProperty("details", "year", newValue);
  };

  const handleFloorChange = (event) => {
    if (event.target.value < 0) {
      return;
    }
    setBuildingFloors(event.target.value);
    setSavedProperty("details", "floorsAmount", event.target.value);
  };

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
                    name="name"
                    value={values.name}
                    onChange={(e) => handleChange(e, "details", "name")}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="Floor area"
                    className={props.style.formComponent}
                    value={values.floorArea}
                    onChange={(e) => handleChange(e, "details", "floorArea")}
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
                    value={buildingType}
                    id="type-dropdown"
                    handler={(e) => handleChange(e, "details", "buildingType")}
                  />
                </Grid>
                <Grid item>
                  <DropdownSelect
                    className={props.style.formComponent}
                    data={buildingOptions.materials}
                    label="Material"
                    value={materialValue}
                    id="material-dropdown"
                    handler={handleMaterialChange}
                  />
                </Grid>
              </Grid>
              <Grid container className={props.style.row} spacing={0}>
                <Slider
                  className={props.style.slider}
                  marks
                  valueLabelDisplay="auto"
                  step={10}
                  defaultValue={buildingYear ? buildingYear : 1990}
                  marks
                  min={1890}
                  max={2010}
                  onChange={handleYearChange}
                />
                <Typography variant="subtitle1" gutterBottom>
                  Construction year {buildingYear}
                </Typography>
              </Grid>

              <Typography variant="h6">Floors</Typography>
              <TextField
                size="small"
                value={buildingFloors ? buildingFloors : "0"}
                type="number"
                onChange={handleFloorChange}
              >
                Count
              </TextField>
              <Grid container className={props.style.controls}>
                <IncrementValue value={buildingFloors} />
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
