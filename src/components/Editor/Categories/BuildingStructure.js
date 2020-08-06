import React, { useState, useEffect } from "react";
import {
  Fade,
  TextField,
  InputAdornment,
  Grid,
  Modal,
  Button,
} from "@material-ui/core";

import { useEditor } from "../../../utils/EditorProvider";
import useFormData from "../useFormData";

import EditorHeader from "../reusable/EditorHeader";
import DropdownSelect from "../reusable/DropdownSelect";
import OldEntry from "../reusable/OldEntry";
import PropertyModal from "../reusable/PropertyModal";

const BuildingStructure = (props) => {
  const {
    buildingOptions,
    showOldEntryButtons,
    showPropertyModal,
    setShowPropertyModal,
  } = useEditor();

  const style = props.style;

  const [open, setOpen] = useState(false);
  const [property, setProperty] = useState();

  const { formData, addNewEntry, addOldEntry, deleteEntry } = useFormData(
    "structure"
  );

  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    return () => {};
  },[]);

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
          open={showPropertyModal}
          onClose={() => setShowPropertyModal(false)}
        >
          <div className={style.modal}>
            <PropertyModal
              data={formData}
              handleDeletion={(property, index) => deleteEntry(property, index)}
            />
          </div>
        </Modal>
        <Grid item>
          <EditorHeader header="Building structure" />
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
                  onChange={(e) => addNewEntry(e, "wallThickness")}
                />
              </Grid>

              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.wallThickness[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("wallThickness")}
                  >
                    +
                  </Button>
                )}
              </Grid>

              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.wallMaterial}
                  label="Wall Material"
                  value={formData.wallMaterial[0].value}
                  handler={(e) => addNewEntry(e, "wallMaterial")}
                />
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.wallMaterial[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("wallMaterial")}
                  >
                    +
                  </Button>
                )}
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
                  onChange={(e) => addNewEntry(e, "heatedWindowAmount")}
                ></TextField>
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.heatedWindowAmount[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("heatedWindowAmount")}
                  >
                    +
                  </Button>
                )}
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.heatedWindowType}
                  label="Heated window type"
                  value={formData.wallMaterial[0].value}
                  handler={(e) => addNewEntry(e, "heatedWindowType")}
                />
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.heatedWindowType[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("heatedWindowType")}
                  >
                    +
                  </Button>
                )}
              </Grid>
              <Grid item sm={1}>
                <TextField
                  className={style.formComponent}
                  value={formData.windowAmount[0].value}
                  label="Windows"
                  type="number"
                  error={isNaN(formData.windowAmount[0].value)}
                  onChange={(e) => addNewEntry(e, "windowAmount")}
                ></TextField>
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.windowAmount[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("windowAmount")}
                  >
                    +
                  </Button>
                )}
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.windowType}
                  label="Window type"
                  value={formData.wallMaterial[0].value}
                  handler={(e) => addNewEntry(e, "windowType")}
                />
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.windowType[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("windowType")}
                  >
                    +
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={2}>
                <TextField
                  className={style.formComponent}
                  value={formData.doorAmount[0].value}
                  label="Doors"
                  type="number"
                  error={isNaN(formData.doorAmount[0].value)}
                  onChange={(e) => addNewEntry(e, "doorAmount")}
                ></TextField>
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.doorAmount[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("doorAmount")}
                  >
                    +
                  </Button>
                )}
              </Grid>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.doorMaterial}
                  label="Door material"
                  value={formData.doorMaterial[0].value}
                  handler={(e) => addNewEntry(e, "doorMaterial")}
                />
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.doorMaterial[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("doorMaterial")}
                  >
                    +
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.roofMaterial}
                  label="Roof type"
                  value={formData.roofMaterial[0].value}
                  handler={(e) => addNewEntry(e, "roofMaterial")}
                />
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.roofMaterial[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("roofMaterial")}
                  >
                    +
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid container className={style.row} spacing={2}>
              <Grid item sm={2}>
                <DropdownSelect
                  className={style.formComponent}
                  data={buildingOptions.floorMaterial}
                  label="Floor material"
                  value={formData?.floorMaterial[0]?.value}
                  handler={(e) => addNewEntry(e, "floorMaterial")}
                ></DropdownSelect>
              </Grid>
              <Grid item sm={1}>
                {showOldEntryButtons && (
                  <Button
                    disabled={!formData?.floorMaterial[0].value}
                    className={style.formButton}
                    color="primary"
                    variant="outlined"
                    onClick={() => setProperty("floorMaterial")}
                  >
                    +
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </div>
    </Fade>
  );
};

export default BuildingStructure;
