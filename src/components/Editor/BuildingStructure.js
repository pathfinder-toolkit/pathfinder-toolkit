import React, { useState, useEffect } from "react";
import {
  Typography,
  Fade,
  TextField,
  InputAdornment,
  Grid,
  Switch,
  FormControlLabel,
} from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import useFormData from "./useFormData";

import Tip from "./Sidebar/Tip";

import DropdownSelect from "./reusable/DropdownSelect";

const BuildingStructure = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const { formData, handleChange } = useFormData("structure");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    return () => {
      //setSavedCategory("structure", formData);
    };
  }, []);

  //Just a quick sketch, will be split into smaller components/remade later
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
                    value={formData.wallMaterial.value}
                    handler={(e) => handleChange(e, "wallMaterial")}
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
              <Grid container className={style.row} spacing={0}>
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
                <Grid item sm={2}>
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.materials}
                    label="Door material"
                    defaultValue="Wood"
                    value={formData.doorMaterial.value}
                    handler={(e) => handleChange(e, "doorMaterial")}
                  />
                </Grid>
              </Grid>
              <Grid container className={style.row} spacing={2}>
                <Grid item sm={2}>
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.roofTypes}
                    label="Roof type"
                    defaultValue="Roof 1"
                    value={formData.roofMaterial.value}
                    handler={(e) => handleChange(e, "roofMaterial")}
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

export default BuildingStructure;
