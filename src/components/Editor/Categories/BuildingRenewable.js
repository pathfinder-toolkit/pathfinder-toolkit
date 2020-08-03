import React, { useState, useEffect } from "react";
import {
  Typography,
  Fade,
  Grid,
  TextField,
  InputAdornment,
  Modal,
  Button,
} from "@material-ui/core";

import { useEditor } from "../../../utils/EditorProvider";
import useFormData from "../useFormData";

import DropdownSelect from "../reusable/DropdownSelect";
import OldEntry from "../reusable/OldEntry";

const BuildingRenewable = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const [open, setOpen] = useState(false);
  const [property, setProperty] = useState();

  const { formData, handleChange, addOldEntry } = useFormData("renewable");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
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
    <Fade in={loading}>
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
        <Grid item>
          <div className={style.header}>
            <Typography variant="h5">Renewable</Typography>
          </div>
          <div className={style.category}>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions?.heatPump}
                  label="Heat pump"
                  value={formData.heatPump.value}
                  handler={(e) => handleChange(e, "heatPump")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.heatPump[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("heatPump")}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions?.solarHeat}
                  label="Solar energy heating"
                  value={formData.solarHeat.value}
                  handler={(e) => handleChange(e, "solarHeat")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.solarHeat[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("solarHeat")}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions?.solarElectric}
                  label="Solar energy electricity"
                  value={formData.solarElectric.value}
                  handler={(e) => handleChange(e, "solarElectric")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.solarElectric[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("solarElectric")}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions?.bioMass}
                  label="Biomass energy"
                  value={formData.bioMass.value}
                  handler={(e) => handleChange(e, "bioMass")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.bioMass[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("bioMass")}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions?.chp}
                  label="Combined heat and power"
                  value={formData.heatPump.value}
                  handler={(e) => handleChange(e, "chp")}
                />
              </Grid>
              <Grid item sm={1}>
                <Button
                  disabled={!formData?.chp[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("chp")}
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

export default BuildingRenewable;
