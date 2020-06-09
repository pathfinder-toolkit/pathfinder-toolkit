import React, { useEffect, useState } from "react";
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Grid,
  Button,
  Fade,
  TextField,
  Paper,
} from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";

const BuildingDetails = (props) => {
  const {
    buildingInformation,
    setSavedName,
    setSavedMaterial,
    setNavigationEnabled,
  } = useEditor();

  const [materialValue, setMaterialValue] = useState(
    buildingInformation.details.material
  );
  const [nameValue, setNameValue] = useState(buildingInformation.details.name);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const { getMaterials } = useBackend();
  const materials = getMaterials();

  const handleMaterialChange = (event) => {
    setMaterialValue(event.target.value);
    setSavedMaterial(event.target.value);
  };

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
    setSavedName(event.target.value);
  };

  useEffect(() => {
    if (
      buildingInformation.details.name &&
      buildingInformation.details.material
    ) {
      setNavigationEnabled(true);
    }
  }, [buildingInformation.details]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Fade in={loading}>
      <div className={props.style.root}>
        <Typography className={props.style.header} variant="h5">
          Building details
        </Typography>
        <Paper className={props.style.category}>
          <FormControl className={props.style.formControl}>
            <InputLabel id="material-test">Material</InputLabel>
            <Select
              labelId="material-test"
              id="material-test"
              className={props.style.required}
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={materialValue}
              onChange={handleMaterialChange}
            >
              <MenuItem value=""></MenuItem>
              {materials.map((material, index) => (
                <MenuItem key={index} value={material}>
                  {material}
                </MenuItem>
              ))}
            </Select>
            <TextField label="Building name" value={nameValue} onChange={handleNameChange} />
          </FormControl>
        </Paper>
      </div>
    </Fade>
  );
};

export default BuildingDetails;
