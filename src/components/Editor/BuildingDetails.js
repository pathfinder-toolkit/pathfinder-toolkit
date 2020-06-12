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
} from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";

import DropdownSelect from "../reusable/DropdownSelect";
import Tip from "./Tip";
import SuggestionAlert from "../reusable/SuggestionAlert";

const BuildingDetails = (props) => {
  const {
    buildingInformation,
    setSavedName,
    setSavedYear,
    setSavedFloors,
    setSavedMaterial,
    setNavigationEnabled,
  } = useEditor();

  const [materialValue, setMaterialValue] = useState(
    buildingInformation.details.material.value
  );
  const [nameValue, setNameValue] = useState(buildingInformation.details.name);
  const [buildingYear, setBuildingYear] = useState(
    buildingInformation.details.year.value
  );
  const [floorArea, setFloorArea] = useState();
  const [buildingFloors, setBuildingFloors] = useState(
    buildingInformation.details.floors.value
  );

  const { getMaterials } = useBackend();
  const materials = getMaterials();

  const handleMaterialChange = (value) => {
    setMaterialValue(value);
    setSavedMaterial(value);
  };

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
    setSavedName(event.target.value);
  };

  const handleFloorAreaChange = (event) => {
    setFloorArea(event.target.value);
  };

  const handleYearChange = (event, newValue) => {
    setBuildingYear(newValue);
    setSavedYear(newValue);
  };

  const handleFloorChange = (event) => {
    if (event.target.value < 0) {
      return;
    }
    setBuildingFloors(event.target.value);
    setSavedFloors(event.target.value);
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (
      buildingInformation.details.name &&
      buildingInformation.details.material
    ) {
      setNavigationEnabled(true);
    }
  }, [buildingInformation.details]);

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
                    value={nameValue}
                    onChange={handleNameChange}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="Floor area"
                    className={props.style.formComponent}
                    onChange={handleFloorAreaChange}
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
                    data={materials}
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
                <Typography gutterBottom>
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
