import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  Fade,
  Paper,
  TextField,
} from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";

import DropdownSelect from "./DropdownSelect";

const BuildingStructure = (props) => {
  const {
    buildingInformation,
    setSavedWallMaterial,
    setSavedRoofType,
    setSavedWindowCount,
    setNavigationEnabled,
  } = useEditor();
  const [wallMaterial, setWallMaterial] = useState(
    buildingInformation.structure.wallMaterial.value
  );
  const [roofType, setRoofType] = useState(
    buildingInformation.structure.roofType.value
  );
  const [windowCount, setWindowCount] = useState(
    buildingInformation.structure.windowCount.value
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const { getMaterials, getRoofTypes } = useBackend();

  const materials = getMaterials();
  const roofs = getRoofTypes();

  const handleMaterialChange = (value) => {
    setWallMaterial(value);
    setSavedWallMaterial(value);
  };

  const handleRoofChange = (value) => {
    setRoofType(value);
    setSavedRoofType(value);
  };

  const handleWindowChange = (event) => {
    if (event.target.value < 0 || isNaN(event.target.value)) {
      return;
    }
    setWindowCount(event.target.value);
    setSavedWindowCount(event.target.value);
  };

  useEffect(() => {
    if (
      buildingInformation.structure.wallMaterial &&
      buildingInformation.structure.roofType &&
      buildingInformation.structure.windowCount
    ) {
      setNavigationEnabled(true);
    }
  }, [buildingInformation.structure]);

  //Just a quick sketch, will be split into smaller components/remade later
  return (
    <Fade in={loading}>
      <div className={props.style.root}>
        <Typography className={props.style.header} variant="h5">
          Structure details
        </Typography>
        <Paper className={props.style.category}>
          <Typography variant="h6">Walls</Typography>
          <FormControl className={props.style.formControl}>
            <DropdownSelect
              data={materials}
              label="Material"
              value={wallMaterial}
              id="wall-material"
              handler={handleMaterialChange}
            />
          </FormControl>
        </Paper>
        <Paper className={props.style.category}>
          <Typography variant="h6">Roof</Typography>
          <FormControl className={props.style.formControl}>
            <DropdownSelect
              data={roofs}
              label="Type"
              value={roofType}
              id="roof-type"
              handler={handleRoofChange}
            />
          </FormControl>
        </Paper>
        <Paper className={props.style.category}>
          <Typography variant="h6">Windows</Typography>
          <TextField
            size="small"
            variant="filled"
            value={windowCount}
            type="number"
            onChange={handleWindowChange}
          >
            Count
          </TextField>
        </Paper>
      </div>
    </Fade>
  );
};

export default BuildingStructure;
