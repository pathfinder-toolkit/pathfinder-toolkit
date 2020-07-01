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

import { useEditor } from "../../utils/EditorProvider";
import useFormData from "./useFormData";

import FeedbackContainer from "./Sidebar/FeedbackContainer";
import DropdownSelect from "./reusable/DropdownSelect";
import OldEntry from "./reusable/OldEntry";
import PropertyList from "./reusable/PropertyList";

const BuildingVentilation = (props) => {
  const { setNavigationEnabled, buildingOptions } = useEditor();

  const style = props.style;

  const [open, setOpen] = useState(false);

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

  const setModal = () => {
    setOpen(true);
  };

  const setClose = () => {
    setOpen(false);
  };

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
        <Grid container spacing={3} sm={12} md={12} lg={12}>
          <Grid item sm={8} md={8} lg={8}>
            <div className={style.header}>
              <Typography variant="h5">Building ventilation</Typography>
            </div>

            <div className={style.category}>
              <Grid className={style.row} container spacing={4}>
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

                {/*  {formData?.ventilationSystem[0].value && (
                  <Grid item sm={3}>
                    <DropdownSelect
                      className={style.formComponent}
                      data={buildingOptions.ventilationTypes}
                      label="Old system test"
                      value={formData?.ventilationSystem?.value}
                      handler={(e) => addOldEntry(e, "ventilationSystem")}
                    />
                  </Grid> */}
              </Grid>
            </div>
          </Grid>
          <Grid className={style.suggestionContainer} item sm={4} md={4} lg={4}>
            <FeedbackContainer />
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingVentilation;
