import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";

const useStyles = makeStyles((theme) => ({
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
  const [material, setMaterial] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const { getMaterials } = useBackend();
  const materials = getMaterials();

  const handleChange = (event) => {
    setMaterial(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Typography>Building details</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="material-test">Material</InputLabel>
        <Select
          labelId="material-test"
          id="material-test"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={material}
          onChange={handleChange}
        >
          <MenuItem value=""></MenuItem>
          {materials.map((material, index) => (
            <MenuItem key={index} value={material}>
              {material}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default BuildingDetails;
