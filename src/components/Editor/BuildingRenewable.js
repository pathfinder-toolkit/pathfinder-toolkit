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

import FeedbackContainer from "./Sidebar/FeedbackContainer";
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
        <Grid container spacing={3} sm={12} md={12} lg={12}>
          <Grid item sm={8} md={8} lg={8}>
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
                    value={formData?.ventilationSystem?.value}
                    handler={(e) => handleChange(e, "heatPump")}
                  />
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

export default BuildingRenewable;
