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
import PropertyList from "../reusable/PropertyList";

const BuildingVentilation = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const [open, setOpen] = useState(false);

  const setModal = () => {
    setOpen(true);
  };

  const setClose = () => {
    setOpen(false);
  };

  const {
    formData,
    handleChange,
    addNewEntry,
    addOldEntry,
    deleteEntry,
  } = useFormData("ventilation");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    return () => {};
  }, []);

  return (
    <Fade in={loading}>
      <div className={style.root}>
        <Modal open={open} onClose={setClose}>
          <div className={style.modal}>
            <OldEntry
              handler={(value, year, propertyName) =>
                addOldEntry(value, year, "ventilationSystem")
              }
              onEntry={setClose}
              data={buildingOptions.ventilationTypes}
            />
          </div>
        </Modal>
        <Grid item>
          <div className={style.header}>
            <Typography variant="h5">Building ventilation</Typography>
          </div>

          <div className={style.category}>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.ventilationTypes}
                  label="Ventilation system"
                  value={formData?.ventilationSystem[0].value}
                  handler={(e) => addNewEntry(e, "ventilationSystem")}
                />
              </Grid>
              {formData?.ventilationSystem[0].value && (
                <Grid item sm={3}>
                  <Button
                    className={style.formButton}
                    color="primary"
                    variant="contained"
                    onClick={setModal}
                  >
                    Add old system
                  </Button>
                </Grid>
              )}
              {formData?.ventilationSystem.length > 1 && (
                <Grid item sm={4}>
                  <PropertyList
                    handleDeletion={(propertyName, index) =>
                      deleteEntry("ventilationSystem", index)
                    }
                    data={formData.ventilationSystem}
                  />
                </Grid>
              )}
            </Grid>
          </div>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingVentilation;
