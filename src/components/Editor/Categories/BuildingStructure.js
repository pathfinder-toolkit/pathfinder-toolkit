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

import { useEditor } from "../../../utils/EditorProvider";
import useFormData from "../useFormData";

import DropdownSelect from "../reusable/DropdownSelect";

const BuildingStructure = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const { formData, handleChange, addNewEntry } = useFormData("structure");

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
        <Grid item alignItems="center" >
          <div className={style.header}>
            <Typography variant="h5">Building structure</Typography>
          </div>
          <div className={style.category}>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  label="Wall thickness"
                  value={formData.wallThickness[0].value}
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
                  data={buildingOptions.wallMaterial}
                  label="Wall Material"
                  value={formData.wallMaterial[0].value}
                  handler={(e) => handleChange(e, "wallMaterial")}
                />
              </Grid>
            </Grid>
            <Grid container className={style.rowNoBorder} spacing={2}>
              <Grid item sm={1}>
                <TextField
                  className={style.formComponent}
                  defaultValue=""
                  value={formData.windowAmount[0].value}
                  label="Windows"
                  type="number"
                  error={isNaN(formData.windowAmount[0].value)}
                  onChange={(e) => handleChange(e, "windowAmount")}
                ></TextField>
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.windowType}
                  label="Window type"
                  value={formData.wallMaterial[0].value}
                  handler={(e) => handleChange(e, "windowType")}
                />
              </Grid>

              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  defaultValue=""
                  value={formData.heatedWindowAmount[0].value}
                  label="In heated area"
                  type="number"
                  error={isNaN(formData.heatedWindowAmount[0].value)}
                  onChange={(e) => handleChange(e, "heatedWindowAmount")}
                ></TextField>
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.heatedWindowType}
                  label="Heated window type"
                  value={formData.wallMaterial[0].value}
                  handler={(e) => handleChange(e, "heatedWindowType")}
                />
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={1}>
                <TextField
                  className={style.formComponent}
                  defaultValue=""
                  value={formData.doorAmount[0].value}
                  label="Doors"
                  type="number"
                  error={isNaN(formData.doorAmount[0].value)}
                  onChange={(e) => handleChange(e, "doorAmount")}
                ></TextField>
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.doorMaterial}
                  label="Door material"
                  defaultValue="Wood"
                  value={formData.doorMaterial[0].value}
                  handler={(e) => handleChange(e, "doorMaterial")}
                />
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.roofMaterial}
                  label="Roof type"
                  defaultValue="Roof 1"
                  value={formData.roofMaterial[0].value}
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
      </div>
    </Fade>
  );
};

export default BuildingStructure;
