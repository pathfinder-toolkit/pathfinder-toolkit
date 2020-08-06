import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Fade,
  TextField,
  InputAdornment,
  Modal,
  Button,
} from "@material-ui/core";

import { useEditor } from "../../../utils/EditorProvider";
import { useAuth0 } from "../../../utils/react-auth0-spa";
import useFormData from "../useFormData";

import EditorHeader from "../reusable/EditorHeader";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import UploadContainer from "../Upload/UploadContainer";
import { Image } from "cloudinary-react";

const BuildingDetails = (props) => {
  const { setBuildingNameEntered } = useEditor();
  const { isAuthenticated } = useAuth0();

  const style = props.style;

  const { formData, handleChange, addImage } = useFormData("details");

  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    return () => {};
  }, []);

  // Require user to enter name, before the user can continue.
  // Name is the only required field, used for generating slug.
  useEffect(() => {
    if (formData.name.value.length > 0) {
      setBuildingNameEntered(true);
    } else {
      setBuildingNameEntered(false);
    }
  }, [formData.name.value]);

  const [open, setOpen] = useState(false);

  return (
    <Fade in={animation}>
      <div className={style.root}>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className={style.imageSelectModal}>
            <UploadContainer
              handleClose={() => setOpen(false)}
              handleChange={(publicId) => addImage(publicId)}
            />
          </div>
        </Modal>
        <Grid item>
          <EditorHeader disableSwitch header="Building Details" />
          <div className={style.category}>
            <Grid className={style.row} container spacing={2}>
              <Grid item>
                <TextField
                  autoFocus
                  className={style.formComponent}
                  label="Building name"
                  value={formData.name.value}
                  required
                  onChange={(e) => handleChange(e, "name", false)}
                />
              </Grid>
              <Grid item sm={1}>
                <TextField
                  label="Year"
                  type="number"
                  className={style.formComponent}
                  value={formData.year.value}
                  onChange={(e) => handleChange(e, "year")}
                />
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={1}>
                <TextField
                  label="Floors"
                  className={style.formComponent}
                  defaultValue="1"
                  value={formData.floorsAmount.value}
                  type="number"
                  onChange={(e) => handleChange(e, "floorsAmount")}
                  error={isNaN(formData.floorsAmount.value)}
                ></TextField>
              </Grid>
              <Grid item sm={2}>
                <TextField
                  label="Floor area"
                  type="number"
                  className={style.formComponent}
                  value={formData.floorArea.value}
                  error={isNaN(formData.floorArea.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">m²</InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e, "floorArea")}
                />
              </Grid>
              <Grid item sm={2}>
                <TextField
                  label="Heated floor area"
                  type="number"
                  disabled={!formData.floorArea.value}
                  className={style.formComponent}
                  value={formData.heatedFloorArea.value}
                  error={isNaN(formData.heatedFloorArea.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">m²</InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e, "heatedFloorArea")}
                />
              </Grid>
            </Grid>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={10}>
                <TextField
                  className={style.formComponent}
                  id="description"
                  label="Description"
                  multiline
                  fullWidth
                  rows={4}
                  value={formData.description.value}
                  onChange={(e) => handleChange(e, "description")}
                  variant="outlined"
                />
              </Grid>
              <Grid item container direction="column" sm={2}>
                <Grid item>
                  <Button
                    onClick={() => setOpen(true)}
                    color="primary"
                    variant="outlined"
                    disabled={!isAuthenticated}
                  >
                    <AddAPhotoIcon />
                  </Button>
                </Grid>
                {formData.image.value && (
                  <Grid item>
                    <Image
                      className={style.formImage}
                      width="70"
                      height="70"
                      publicId={formData.image.value}
                      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
              Electricity
            </Typography>
            <Grid container direction="row" spacing={2}>
              <Grid item sm={2}>
                <TextField
                  label="Annual use"
                  type="number"
                  className={style.formComponent}
                  value={formData.annualConsumption.value}
                  onChange={(e) => handleChange(e, "annualConsumption")}
                  error={isNaN(formData.annualConsumption.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kWh</InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item sm={2}>
                <TextField
                  label="Annual cost"
                  type="number"
                  className={style.formComponent}
                  value={formData.annualCost.value}
                  onChange={(e) => handleChange(e, "annualCost")}
                  error={isNaN(formData.annualCost.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">€</InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
              Heating
            </Typography>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={2}>
                <TextField
                  label="Annual use"
                  type="number"
                  className={style.formComponent}
                  value={formData.annualHeatingConsumption.value}
                  onChange={(e) => handleChange(e, "annualHeatingConsumption")}
                  error={isNaN(formData.annualHeatingConsumption.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kWh</InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item sm={2}>
                <TextField
                  label="Annual cost"
                  type="number"
                  className={style.formComponent}
                  value={formData.annualHeatingCost.value}
                  onChange={(e) => handleChange(e, "annualHeatingCost")}
                  error={isNaN(formData.annualHeatingCost.value)}
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
      </div>
    </Fade>
  );
};

export default BuildingDetails;
