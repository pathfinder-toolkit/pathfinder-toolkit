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

import OldEntryTest from "../reusable/OldEntryTest";
import PropertyListTest from "../reusable/PropertyListTest";

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
            <OldEntryTest
              handler={(value, year, propertyName, description) =>
                addOldEntry(value, year, "ventilationSystem", description)
              }
              onEntry={setClose}
              data={buildingOptions.ventilationTypes}
            />
          </div>
        </Modal>
        <Grid item alignItems="center">
          <div className={style.header}>
            <Typography variant="h5">Building ventilation</Typography>
          </div>

          <div className={style.category}>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.ventilationSystems}
                  label="Ventilation system"
                  value={formData?.ventilationSystem[0].value}
                  handler={(e) => addNewEntry(e, "ventilationSystem")}
                />
              </Grid>
              <Grid item sm={3}>
                <Button
                  disabled={!formData?.ventilationSystem[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={setModal}
                >
                  Add old system
                </Button>
              </Grid>
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

              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.ventilationSystems}
                  label="Test property"
                  value={formData?.ventilationSystem[0].value}
                  handler={(e) => addNewEntry(e, "ventilationSystem")}
                />
              </Grid>
              <Grid item sm={3}>
                <Button
                  disabled={!formData?.ventilationSystem[0].value}
                  className={style.formButton}
                  color="primary"
                  variant="outlined"
                  onClick={setModal}
                >
                  Add with comment
                </Button>
              </Grid>
              {formData?.ventilationSystem.length > 1 && (
                <Grid item sm={4}>
                  <PropertyListTest
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
