import React, { useState, useEffect } from "react";
import {
  Typography,
  Fade,
  TextField,
  InputAdornment,
  Grid,
  Switch,
  FormControlLabel,
  Modal,
  Button,
} from "@material-ui/core";

import { useEditor } from "../../../utils/EditorProvider";
import useFormData from "../useFormData";

import DropdownSelect from "../reusable/DropdownSelect";
import OldEntry from "../reusable/OldEntry";
import PropertyList from "../reusable/PropertyList";

const BuildingStructure = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const [open, setOpen] = useState(false);
  const [property, setProperty] = useState();

  const { formData, handleChange, addOldEntry } = useFormData("structure");

  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (property) {
      console.log("Adding oldEntry to : " + property);
      setOpen(true);
    }
  }, [property]);

  const resetModal = () => {
    setOpen(false);
    setProperty();
  };

  return (
    <Fade in={animation}>
      <div className={style.root}>
        <Modal open={open} onClose={() => resetModal()}>
          <div className={style.modal}>
            <OldEntry
              property={property}
              handler={(value, year, propertyName) =>
                addOldEntry(value, year, property)
              }
              onEntry={() => resetModal()}
              data={buildingOptions[property]}
            />
          </div>
        </Modal>
        <Grid item alignItems="center">
          <div className={style.header}>
            <Typography variant="h5">Building structure</Typography>
          </div>
          <div className={style.category}>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  label="Wall thickness"
                  value={formData.wallThickness[0].value}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">mm</InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e, "wallThickness")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.wallThickness[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("wallThickness")}
                >
                  +
                </Button>
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.wallMaterial}
                  label="Wall Material"
                  value={formData.wallMaterial[0].value}
                  handler={(e) => handleChange(e, "wallMaterial")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.wallMaterial[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("wallMaterial")}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <Grid container className={style.rowNoBorder} spacing={2}>
              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  value={formData.heatedWindowAmount[0].value}
                  label="In heated area"
                  type="number"
                  error={isNaN(formData.heatedWindowAmount[0].value)}
                  onChange={(e) => handleChange(e, "heatedWindowAmount")}
                ></TextField>
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.heatedWindowAmount[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("heatedWindowAmount")}
                >
                  +
                </Button>
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.heatedWindowType}
                  label="Heated window type"
                  value={formData.wallMaterial[0].value}
                  handler={(e) => handleChange(e, "heatedWindowType")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.heatedWindowType.value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("heatedWindowType")}
                >
                  +
                </Button>
              </Grid>
              <Grid item sm={1}>
                <TextField
                  className={style.formComponent}
                  value={formData.windowAmount[0].value}
                  label="Windows"
                  type="number"
                  error={isNaN(formData.windowAmount[0].value)}
                  onChange={(e) => handleChange(e, "windowAmount")}
                ></TextField>
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.windowAmount[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("windowAmount")}
                >
                  +
                </Button>
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.windowType}
                  label="Window type"
                  value={formData.wallMaterial[0].value}
                  handler={(e) => handleChange(e, "windowType")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.windowType[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("windowType")}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={1}>
                <TextField
                  className={style.formComponent}
                  value={formData.doorAmount[0].value}
                  label="Doors"
                  type="number"
                  error={isNaN(formData.doorAmount[0].value)}
                  onChange={(e) => handleChange(e, "doorAmount")}
                ></TextField>
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.doorAmount[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("doorAmount")}
                >
                  +
                </Button>
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.doorMaterial}
                  label="Door material"
                  value={formData.doorMaterial[0].value}
                  handler={(e) => handleChange(e, "doorMaterial")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.doorMaterial[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("doorMaterial")}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.roofMaterial}
                  label="Roof type"
                  value={formData.roofMaterial[0].value}
                  handler={(e) => handleChange(e, "roofMaterial")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.roofMaterial[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("roofMaterial")}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.floorMaterial}
                  label="Floor material"
                  value={formData?.floorMaterial[0]?.value}
                  handler={(e) => handleChange(e, "floorMaterial")}
                ></DropdownSelect>
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.floorMaterial[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("floorMaterial")}
                >
                  +
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingStructure;
