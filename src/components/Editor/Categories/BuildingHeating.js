import React, { useState, useEffect } from "react";
import { Typography, Fade, Grid, Modal, Button } from "@material-ui/core";

import { useEditor } from "../../../utils/EditorProvider";
import useFormData from "../useFormData";

import EditorHeader from "../reusable/EditorHeader";
import DropdownSelect from "../reusable/DropdownSelect";
import OldEntry from "../reusable/OldEntry";

import PropertyModal from "../reusable/PropertyModal";

const BuildingHeating = (props) => {
  const { buildingOptions, showOldEntryButtons } = useEditor();

  const style = props.style;

  const [open, setOpen] = useState(false);
  const [property, setProperty] = useState();

  const [openPropertyModal, setOpenPropertyModal] = useState(false);

  const {
    formData,
    handleChange,
    addOldEntry,
    addNewEntry,
    deleteEntry,
  } = useFormData("heating");

  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (property) {
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
        <Modal
          open={openPropertyModal}
          onClose={() => setOpenPropertyModal(false)}
        >
          <div className={style.modal}>
            <PropertyModal
              data={formData}
              handleDeletion={(property, index) => deleteEntry(property, index)}
            />
          </div>
        </Modal>
        <Grid item>
          <EditorHeader header="Building heating" />
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
                  handler={(e) => addNewEntry(e, "heatingSystem")}
                />
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.heatingSystem[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("heatingSystem")}
                  >
                    +
                  </Button>
                )}
              </Grid>

              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.heatingSource}
                  label="Heating source"
                  value={formData?.heatingSource[0].value}
                  handler={(e) => addNewEntry(e, "heatingSource")}
                />
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.heatingSource[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("heatingSource")}
                  >
                    +
                  </Button>
                )}
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
