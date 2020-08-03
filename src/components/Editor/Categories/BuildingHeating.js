import React, { useState, useEffect } from "react";
import { Typography, Fade, Grid, Modal, Button } from "@material-ui/core";

import { useEditor } from "../../../utils/EditorProvider";
import useFormData from "../useFormData";

import DropdownSelect from "../reusable/DropdownSelect";
import OldEntry from "../reusable/OldEntry";
import PropertyList from "../reusable/PropertyList";

const BuildingHeating = (props) => {
  const { buildingOptions } = useEditor();

  const style = props.style;

  const [open, setOpen] = useState(false);
  const [property, setProperty] = useState();

  const {
    formData,
    handleChange,
    addOldEntry,
    addNewEntry,
    deleteEntry,
  } = useFormData("heating");

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
            <Typography variant="h5">Building heating</Typography>
          </div>
          <div className={style.category}>
            <Grid
              className={style.row}
              container
              alignItems="center"
              spacing={2}
            >
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.heatingSystem}
                  label="Heating System"
                  value={formData?.heatingSystem[0].value}
                  handler={(e) => handleChange(e, "heatingSystem")}
                />
              </Grid>
              <Grid item sm={3}>
                <Button
                  disabled={!formData?.heatingSystem[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("heatingSystem")}
                >
                  +
                </Button>
              </Grid>

              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.heatingSource}
                  label="Heating source"
                  value={formData?.heatingSource[0].value}
                  handler={(e) => handleChange(e, "heatingSource")}
                />
              </Grid>
              <Grid item sm={3}>
                <Button
                  disabled={!formData?.heatingSource[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={() => setProperty("heatingSource")}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <Grid className={style.row} container spacing={2}></Grid>
          </div>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingHeating;
