import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const BuildingDetails = () => {
  const classes = useStyles();
  const [material, setMaterial] = useState("");
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const { getMaterials } = useBackend();
  const materials = getMaterials();

  const { setSavedName, setSavedMaterial } = useEditor();

  const handleMaterialChange = (event) => {
    setMaterial(event.target.value);
    setSavedMaterial(event.target.value);
  };

  const handleNameChange = (event) => {
    setSavedName(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Fade in={loading}>
      <div className={classes.root}>
        <Typography variant="h5" aling="center">
          Building details
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="material-test">Material</InputLabel>
          <Select
            labelId="material-test"
            id="material-test"
            className={classes.required}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={material}
            onChange={handleMaterialChange}
          >
            <MenuItem value=""></MenuItem>
            {materials.map((material, index) => (
              <MenuItem key={index} value={material}>
                {material}
              </MenuItem>
            ))}
          </Select>
          <TextField label="Building name" onChange={handleNameChange}/>
        </FormControl>
      </div>
    </Fade>
  );
};

export default BuildingDetails;
