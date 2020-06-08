import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Fade } from "@material-ui/core/";
import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import AreaMap from "./AreaMap";

const AreaSelection = () => {
  const {
    buildingInformation,
    setSavedArea,
    setNavigationEnabled,
  } = useEditor();

  const { getCountries } = useBackend();
  const [selectedArea, setSelectedArea] = useState(buildingInformation.area);
  const [allowedCountries] = useState(getCountries());
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const useStyles = makeStyles((theme) => ({
    selection: {
      position: "absolute",
      bottom: 50,
      left: 275,
      border: "1px solid black",
      borderRadius: "4px",
    },
    selectionText: {
      padding: "0.5rem",
    },
  }));
  const classes = useStyles();

  const handleSelection = (selectedCountry) => {
    setSelectedArea(selectedCountry);
    setSavedArea(selectedCountry);
    setNavigationEnabled(true);
  };

  return (
    <React.Fragment>
      <AreaMap
        allowedCountries={allowedCountries}
        selectedCountry={selectedArea}
        handleSelection={handleSelection}
      ></AreaMap>
    </React.Fragment>
  );
};

export default AreaSelection;
