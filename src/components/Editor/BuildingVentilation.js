import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  Fade,
  Paper,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

import Tip from "./Tip";

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

  const style = props.style;

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
            <Tip text="Text" title="Title"></Tip>
            <Tip text="Text" title="Title"></Tip>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingVentilation;
