import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Fade,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import { useEditor } from "../../../utils/EditorProvider";
import useFormData from "../useFormData";

import DropdownSelect from "../reusable/DropdownSelect";
import PhotoButton from "../reusable/PhotoButton";

const BuildingDetails = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const {
    formData,
    handleChange,
    handleFileChange,
    validateNumber,
  } = useFormData("details");

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
        <Grid item>
          <div className={style.header}>
            <Typography variant="h5">Building details</Typography>
          </div>
          <div className={style.category}>
            <Grid className={style.row} container spacing={2}>
              <Grid item>
                <TextField
                  autoFocus
                  className={style.formComponent}
                  label="Building name *"
                  value={formData.name.value}
                  onChange={(e) => handleChange(e, "name", false)}
                  onBlur
                />
              </Grid>
              <Grid item sm={1}>
                <TextField
                  className={style.formComponent}
                  label="Year"
                  value={formData.year.value}
                  onBlur={() => console.log("yeee")}
                  onChange={(e) => handleChange(e, "year")}
                />
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.buildingTypes}
                  label="Building type"
                  defaultValue="Building 1"
                  handler={(e) => handleChange(e, "buildingType")}
                />
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={1}>
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
            <Grid className={style.row} container spacing={2}>
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
            <Grid container direction="row" spacing={2}>
              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  value={formData.annualConsumption.value}
                  onChange={(e) => handleChange(e, "annualConsumption")}
                  label="Annual use"
                  error={isNaN(formData.annualConsumption.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kWh</InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  value={formData.annualCost.value}
                  onChange={(e) => handleChange(e, "annualCost")}
                  label="Annual cost"
                  error={isNaN(formData.annualCost.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">€</InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
              Heating
            </Typography>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  value={formData.annualHeatingConsumption.value}
                  onChange={(e) => handleChange(e, "annualHeatingConsumption")}
                  label="Annual use"
                  error={isNaN(formData.annualHeatingConsumption.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kWh</InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  value={formData.annualHeatingCost.value}
                  onChange={(e) => handleChange(e, "annualHeatingCost")}
                  label="Annual cost"
                  error={isNaN(formData.annualHeatingCost.value)}
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
      </div>
    </Fade>
  );
};

export default BuildingDetails;
