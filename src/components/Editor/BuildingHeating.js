import React, { useState, useEffect } from "react";
import {
  Typography,
  Fade,
  TextField,
  Grid,
  InputAdornment,
  Modal,
  Button,
} from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import useFormData from "./useFormData";

import FeedbackContainer from "./Sidebar/SuggestionContainer";
import DropdownSelect from "./reusable/DropdownSelect";
import OldEntry from "./reusable/OldEntry";
import PropertyList from "./reusable/PropertyList";

const BuildingHeating = (props) => {
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
    addOldEntry,
    addNewEntry,
    deleteEntry,
  } = useFormData("heating");

  // Save form data to local storage on unmount
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    return () => {};
  }, []);

  //className={props.style.required}
  return (
    <Fade in={loading}>
      <div className={style.root}>
        <Modal open={open} onClose={setClose}>
          <div className={style.modal}>
            <OldEntry
              handler={(value, year, propertyName) =>
                addOldEntry(value, year, "heatingSystem")
              }
              onEntry={setClose}
              data={buildingOptions.ventilationTypes}
            />
          </div>
        </Modal>
        <Grid container spacing={3} sm={12} md={12} lg={12}>
          <Grid item sm={8} md={8} lg={8}>
            <div className={style.header}>
              <Typography variant="h5">Building heating</Typography>
            </div>
            <div className={style.category}>
              <Grid className={style.row} container spacing={2}>
                <Grid item sm={3}>
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.heatingTypes}
                    label="Heating System"
                    value={formData.heatingSystem.value}
                    handler={(e) => handleChange(e, "heatingSystem")}
                  />
                </Grid>
                {formData?.heatingSystem[0].value && (
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
                <Grid item sm={3}>
                  <DropdownSelect
                    className={style.formComponent}
                    data={buildingOptions.heatingTypes}
                    label="Heating source"
                    value={formData.heatingSource.value}
                    handler={(e) => handleChange(e, "heatingSource")}
                  />
                </Grid>
              </Grid>
              <Grid className={style.row} container spacing={2}>
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

export default BuildingHeating;
