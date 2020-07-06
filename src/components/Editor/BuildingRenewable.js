import React, { useState, useEffect } from "react";
import {
  Typography,
  Fade,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import useFormData from "./useFormData";

import FeedbackContainer from "./Sidebar/SuggestionContainer";
import DropdownSelect from "./reusable/DropdownSelect";

const BuildingRenewable = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const { formData, handleChange } = useFormData("renewable");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    return () => {};
  }, []);

  return (
    <Fade in={loading}>
      <div className={style.root}>
        <Grid item>
          <div className={style.header}>
            <Typography variant="h5">Renewable</Typography>
          </div>
          <div className={style.category}>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions?.ventilationTypes}
                  label="Heat pump"
                  value={formData.heatPump.value}
                  handler={(e) => handleChange(e, "heatPump")}
                />
              </Grid>
            </Grid>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions?.ventilationTypes}
                  label="Solar energy heating"
                  value={formData.solarHeat.value}
                  handler={(e) => handleChange(e, "solarHeat")}
                />
              </Grid>
            </Grid>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions?.ventilationTypes}
                  label="Solar energy electricity"
                  value={formData.solarElectric.value}
                  handler={(e) => handleChange(e, "solarElectric")}
                />
              </Grid>
            </Grid>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions?.ventilationTypes}
                  label="Biomass energy"
                  value={formData.bioMass.value}
                  handler={(e) => handleChange(e, "bioMass")}
                />
              </Grid>
            </Grid>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={4}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions?.ventilationTypes}
                  label="Combined heat and power"
                  value={formData.heatPump.value}
                  handler={(e) => handleChange(e, "chp")}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingRenewable;
