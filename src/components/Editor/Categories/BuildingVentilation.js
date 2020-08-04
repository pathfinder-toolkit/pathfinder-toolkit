import React, { useState, useEffect } from "react";
import { Typography, Fade, Grid, Modal, Button } from "@material-ui/core";

import { useEditor } from "../../../utils/EditorProvider";
import useFormData from "../useFormData";

import EditorHeader from "../reusable/EditorHeader";
import DropdownSelect from "../reusable/DropdownSelect";
import OldEntry from "../reusable/OldEntry";
import PropertyList from "../reusable/PropertyList";

const BuildingVentilation = (props) => {
  const { buildingOptions, showOldEntryButtons } = useEditor();

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

  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    return () => {};
  }, []);

  return (
    <Fade in={animation}>
      <div className={style.root}>
        <Modal open={open} onClose={setClose}>
          <div className={style.modal}>
            <OldEntry
              handler={(value, year, propertyName, description) =>
                addOldEntry(value, year, "ventilationSystem")
              }
              onEntry={setClose}
              data={buildingOptions.ventilationSystem}
            />
          </div>
        </Modal>
        <Grid item>
          <EditorHeader header="Building ventilation" />
          <div className={style.category}>
            <Grid className={style.row} container spacing={2}>
              <Grid item sm={3}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.ventilationSystem}
                  label="Ventilation system"
                  value={formData?.ventilationSystem[0].value}
                  handler={(e) => addNewEntry(e, "ventilationSystem")}
                />
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.ventilationSystem[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={setModal}
                  >
                    +
                  </Button>
                )}
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
            </Grid>
          </div>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingVentilation;
