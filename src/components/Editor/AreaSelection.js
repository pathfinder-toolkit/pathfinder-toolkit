import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Fade } from "@material-ui/core/";
import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import AreaMap from "./AreaMap";
import { useEditor } from "../../utils/EditorProvider";

const AreaSelection = () => {
  const { setSavedArea } = useEditor();

  const { getCountries } = useBackend();
  const { setNavigationEnabled } = useEditor();
  const [selectedArea, setSelectedArea] = useState("");
  const [allowedCountries, setAllowedCountries] = useState(getCountries());
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const useStyles = makeStyles((theme) => ({
    selection: {
      position: "fixed",
      bottom: 50,
      left: 275,
      border: "1px solid black",
      borderRadius: "4px"
    },
    selectionText: {
      padding: "0.5rem",
    },
  }));
  const classes = useStyles();

  const handleSelection = (selectedCountry) => {
    setSelectedArea(selectedCountry);
    setNavigationEnabled(true);
    setSavedArea(selectedCountry);
  };

  return (
    <React.Fragment>
      <AreaMap
        allowedCountries={allowedCountries}
        handleSelection={handleSelection}
      />

      {selectedArea && (
        <Fade in={selectedArea}>
        <div className={classes.selection}>
          <Typography className={classes.selectionText}>
            Selected country: {selectedArea}
          </Typography>
        </div>
        </Fade>
      )}
    </React.Fragment>
  );
};

export default AreaSelection;
