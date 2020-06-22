import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  Fade,
  Paper,
  TextField,
} from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import {useTimer} from "../../utils/useTimer";

import DropdownSelect from "./reusable/DropdownSelect";

const BuildingStructure = (props) => {
  const {
    setNavigationEnabled,
    getSavedCategory,
    setSavedCategory,
    buildingOptions,
  } = useEditor();

  const [formData, setFormData] = useState(getSavedCategory("structure"));

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
      setSavedCategory("structure", formData);
    },
    500,
    [formData]
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  //Just a quick sketch, will be split into smaller components/remade later
  return (
    <Fade in={loading}>
      <div className={props.style.root}>
        <Typography className={props.style.header} variant="h5">
          Structure details
        </Typography>
        <div className={props.style.category}>
          <Typography variant="h6">Walls</Typography>

          <DropdownSelect
            className={props.style.formComponent}
            data={buildingOptions.materials}
            label="Material"
            value={formData.wallMaterial.value}
            id="wall-material"
            handler={(e) => handleChange(e, "wallMaterial")}
          />
          <Typography variant="h6">Roof</Typography>
          <DropdownSelect
            className={props.style.formComponent}
            data={buildingOptions.roofTypes}
            label="Type"
            value={formData.roofMaterial.value}
            id="roof-type"
            handler={(e) => handleChange(e, "roofMaterial")}
          />

          <Typography variant="h6">Windows</Typography>
          <TextField
            className={props.style.formComponent}
            size="small"
            value={formData.windowAmount.value}
            type="number"
            onChange={(e) => handleChange(e, "windowAmount")}
          >
            Count
          </TextField>
        </div>
      </div>
    </Fade>
  );
};

export default BuildingStructure;
