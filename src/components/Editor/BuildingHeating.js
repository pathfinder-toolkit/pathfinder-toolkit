import React, { useState, useEffect } from "react";
import {
  Typography,
  Fade,
  TextField,
  Grid,
  InputAdornment,
} from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import useFormData from "./useFormData";

import FeedbackContainer from "./Sidebar/FeedbackContainer";
import DropdownSelect from "./reusable/DropdownSelect";

const BuildingHeating = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const { formData, handleChange } = useFormData("heating");

  // Save form data to local storage on unmount
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    return () => {};
  }, []);

  //className={props.style.required}
  return (
    <Fade in={loading}>
      <div className={style.root}>
        <Grid container spacing={3} sm={12} md={12} lg={12}>
          <Grid item sm={8} md={8} lg={8}>
            <div className={style.header}>
              <Typography variant="h5">Building heating</Typography>
            </div>
            <div className={style.category}>
              <Grid className={style.row} container spacing={2}>
                <Grid item sm={3}>
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.heatingTypes}
                    label="Heating System"
                    value={formData.heatingSystem.value}
                    handler={(e) => handleChange(e, "heatingSystem")}
                  />
                </Grid>
                <Grid item sm={3}>
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.heatingTypes}
                    label="Heating source"
                    value={formData.heatingSource.value}
                    handler={(e) => handleChange(e, "heatingSource")}
                  />
                </Grid>
              </Grid>
              <Grid className={style.row} container spacing={2}>
                <Grid item sm={3}>
                  <TextField
                    className={style.formComponent}
                    value={formData?.annualCost?.value}
                    label="Annual cost"
                    onChange={(e) => handleChange(e, "annualCost")}
                    error={isNaN(formData?.annualCost?.value)}
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
            <FeedbackContainer />
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingHeating;
