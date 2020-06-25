import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Fade,
  TextField,
  Slider,
  InputAdornment,
} from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import useFormData from "./useFormData";

import DropdownSelect from "./reusable/DropdownSelect";
import PhotoButton from "./reusable/PhotoButton";
import SuggestionContainer from "./Sidebar/FeedbackContainer";

const BuildingDetails = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const { formData, handleChange, handleFileChange } = useFormData("details");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    return () => {
      //setSavedCategory("details", formData);
    };
  }, []);

  return (
    <Fade in={loading}>
      <div className={style.root}>
        <Grid container spacing={3} sm={12} md={12} lg={12}>
          <Grid item sm={8} md={8} lg={8}>
            <div className={style.header}>
              <Typography variant="h5">Building details</Typography>
            </div>
            <div className={style.category}>
              <Grid className={style.row} container spacing={0}>
                <Grid item>
                  <TextField
                    autoFocus
                    className={style.formComponent}
                    label="Building name *"
                    value={formData.name.value}
                    onChange={(e) => handleChange(e, "name", false)}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    className={style.formComponent}
                    label="Year"
                    value={formData.year.value}
                    error={isNaN(formData.year.value)}
                    onChange={(e) => handleChange(e, "year")}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.buildingTypes}
                    label="Building type"
                    defaultValue="Building 1"
                    value={formData.buildingType.value}
                    handler={(e) => handleChange(e, "buildingType")}
                  />
                </Grid>
              </Grid>
              <Grid container className={style.row} spacing={0}>
                <Grid item sm={2}>
                  <TextField
                    className={style.formComponent}
                    defaultValue="1"
                    value={formData.floorsAmount.value}
                    label="Floors"
                    type="number"
                    onChange={(e) => handleChange(e, "floorsAmount")}
                    error={isNaN(formData.floorsAmount.value)}
                  ></TextField>
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="Floor area"
                    className={style.formComponent}
                    value={formData.floorArea.value}
                    error={isNaN(formData.floorArea.value)}
                    /*helperText={
                      isNaN(formData.floorArea.value) ? "Incorrect entry" : ""
                    }*/
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
                    /*helperText={
                      isNaN(formData.heatedFloorArea.value)
                        ? "Incorrect entry"
                        : ""
                    }*/
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m²</InputAdornment>
                      ),
                    }}
                    onChange={(e) => handleChange(e, "heatedFloorArea")}
                  />
                </Grid>
              </Grid>
              <Grid container sm={12} md={12} lg={12}>
                <Grid item sm={1}></Grid>
              </Grid>
              {/*<Grid container className={style.row} spacing={0}>
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
              </Grid> */}
              <Grid className={style.row} container spacing={0}>
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
                  <PhotoButton
                    handler={handleFileChange}
                    defaultValue={formData.image?.value?.name}
                  />
                </Grid>
              </Grid>
              <Typography variant="h5" gutterBottom>
                Electricity
              </Typography>
              <Grid container className={style.row} spacing={0}>
                <Grid item sm={3}>
                  <TextField
                    className={style.formComponent}
                    value={formData?.annualUse?.value}
                    onChange={(e) => handleChange(e, "annualUse")}
                    label="Annual use"
                    error={isNaN(formData.floorsAmount.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kWh</InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>
                <Grid item sm={3}>
                  <TextField
                    className={style.formComponent}
                    value={formData?.annualCost?.value}
                    onChange={(e) => handleChange(e, "annualCost")}
                    label="Annual cost"
                    error={isNaN(formData.floorsAmount.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">€</InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid className={style.suggestionContainer} item sm={4} md={4} lg={4}>
            <SuggestionContainer />
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingDetails;
