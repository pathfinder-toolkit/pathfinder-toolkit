import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core/";
import { useBackend } from "../../utils/FakeBackend";
import AreaMap from "./AreaMap";
import { useEditor } from "../../utils/EditorProvider";

const AreaSelection = () => {
  const { setSavedArea } = useEditor();

  const { getCountries } = useBackend();
  const [selectedArea, setSelectedArea] = useState("");
  const [allowedCountries, setAllowedCountries] = useState(getCountries());
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const useStyles = makeStyles((theme) => ({
    selection: {
      position: "fixed",
      bottom: 50,
      left: 275,
    },
  }));
  const classes = useStyles();

  const handleSelection = (selectedCountry) => {
    setSelectedArea(selectedCountry);
    setSavedArea(selectedCountry);
  };

  return (
    <React.Fragment>
      <AreaMap
        allowedCountries={allowedCountries}
        handleSelection={handleSelection}
      />

      {selectedArea && (
        <div className={classes.selection}>
          <Typography>Selected country: {selectedArea}</Typography>
        </div>
      )}
    </React.Fragment>
  );
};

export default AreaSelection;
