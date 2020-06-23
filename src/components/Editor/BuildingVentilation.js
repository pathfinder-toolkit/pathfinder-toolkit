import React, { useState, useEffect } from "react";
import { Typography, FormControl, Fade, Paper } from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

import DropdownSelect from "./reusable/DropdownSelect";

const BuildingVentilation = (props) => {
  const {
    setNavigationEnabled,
    getSavedCategory,
    setSavedCategory,
    buildingOptions,
  } = useEditor();

  const [formData, setFormData] = useState(getSavedCategory("ventilation"));

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
      setSavedCategory("ventilation", formData);
    },
    500,
    [formData]
  );

  // Save form data to local storage on unmount
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    return () => {
      setSavedCategory("ventilation", formData);
    }
  }, []);

  return (
    <Fade in={loading}>
    <div className={style.root}>
      <div className={style.header}>
        <Typography variant="h5">Building structure</Typography>
      </div>
      <Grid container spacing={3} sm={12} md={12} lg={12}>
        <Grid item sm={8} md={8} lg={8}>
          <div className={style.category}>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <TextField
                  className={style.formComponent}
                  label="Wall thickness"
                  value={formData.wallThickness.value}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">mm</InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e, "wallThickness")}
                />
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.materials}
                  label="Wall Material"
                  defaultValue="Material"
                  value={formData.wallMaterial.value}
                />
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={0}>
              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  defaultValue="1"
                  value={formData.windowAmount.value}
                  label="Windows"
                  type="number"
                  error={isNaN(formData.windowAmount.value)}
                  onChange={(e) => handleChange(e, "windowAmount")}
                ></TextField>
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.materials}
                  label="Door material"
                  defaultValue="Wood"
                  value={formData.doorMaterial.value}
                />
              </Grid>
              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  defaultValue="1"
                  value={formData.doorAmount.value}
                  label="Doors"
                  type="number"
                  error={isNaN(formData.doorAmount.value)}
                  onChange={(e) => handleChange(e, "doorAmount")}
                ></TextField>
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.materials}
                  label="Roof material"
                  defaultValue="Wood"
                  value={formData.roofMaterial.value}
                />
              </Grid>
              <Grid item sm={2}>
                <FormControlLabel
                  className={style.formComponent}
                  control={
                    <Switch
                      onChange={(e) => handleChange(e, "roofInsulation")}
                    />
                  }
                  label="Insulated"
                  labelPlacement="top"
                />
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

export default BuildingVentilation;
