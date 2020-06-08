import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core/";
import { useBackend } from "../../utils/FakeBackend";
import AreaMap from "./AreaMap";

const AreaSelection = () => {
  const [selectedArea, setSelectedArea] = useState("");
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

  const { getCountries } = useBackend();
  const allowedCountries = getCountries();

  const handleSelection = (selectedCountry) => {
    setSelectedArea(selectedCountry);
  };

  return (
    <React.Fragment>
      <Typography align="center">Select building area</Typography>
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
