import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core/";
import { useBackend } from "../../utils/FakeBackend";

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

  return (
    <React.Fragment>
      <Typography align="center">Select building area</Typography>
      <ComposableMap
        width="800"
        height="375"
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-20.0, -60.0, 0],
          scale: 500,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              if (allowedCountries.includes(geo.properties.NAME)) {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#9998A3"
                    stroke="#EAEAEC"
                    onClick={() => setSelectedArea(geo.properties.NAME)}
                    style={{
                      default: {
                        fill: "#F53",
                        outline: "none",
                      },
                      hover: {
                        fill: "#E42",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                );
              } else {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#9998A3"
                    stroke="#EAEAEC"
                    onClick={() => setSelectedArea(geo.properties.NAME)}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none",
                      },
                      hover: {
                        fill: "#D6D6DA",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#D6D6DA",
                        outline: "none",
                      },
                    }}
                  />
                );
              }
            })
          }
        </Geographies>
      </ComposableMap>
      {selectedArea && (
        <div className={classes.selection}>
          <Typography>Selected country: {selectedArea}</Typography>
        </div>
      )}
    </React.Fragment>
  );
};

export default AreaSelection;
