import React, { useState, useEffect } from "react";
import {
  Typography,
  Fade,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import { Alert, AlertTitle } from "@material-ui/lab";

import { useEditor } from "../../utils/EditorProvider";
import useFormData from "./useFormData";

import DropdownSelect from "./reusable/DropdownSelect";

const BuildingVentilation = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const { formData, handleChange } = useFormData("ventilation");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    return () => {
      //setSavedCategory("ventilation", formData);
    };
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
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.ventilationTypes}
                    label="Ventilation System"
                    value={formData.ventilationSystem.value}
                    handler={(e) => handleChange(e, "ventilationSystem")}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid className={style.suggestionContainer} item sm={4} md={4} lg={4}>
            <Alert severity="info">
              <AlertTitle>Ventilation</AlertTitle>
              Alert text
            </Alert>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingVentilation;
