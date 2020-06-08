import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const AreaMap = (props) => {
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const allowedCountries = props.allowedCountries;
  const selectedCountry = props.selectedCountry;

  const styles = {
    validCountry: {
      default: {
        fill: "#949ee3",
        outline: "none",
      },
      hover: {
        fill: "#7885de",
        outline: "none",
      },
      pressed: {
        fill: "#5e6edb",
        outline: "none",
      },
    },
    invalidCountry: {
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
    },
    selectedCountry: {
      default: {
        fill: "#5e6edb",
        outline: "none",
      },
      hover: {
        fill: "#5e6edb",
        outline: "none",
      },
      pressed: {
        fill: "#5e6edb",
        outline: "none",
      },
    },
  };

  return (
    <ComposableMap
      width="800"
      height="410"
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-20.0, -60.0, 0],
        scale: 500,
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            if (selectedCountry === geo.properties.NAME) {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#9998A3"
                  stroke="#EAEAEC"
                  style={styles.selectedCountry}
                />
              );
            } else if (allowedCountries.includes(geo.properties.NAME)) {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#9998A3"
                  stroke="#EAEAEC"
                  onClick={() => props.handleSelection(geo.properties.NAME)}
                  style={styles.validCountry}
                />
              );
            } else {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#9998A3"
                  stroke="#EAEAEC"
                  style={styles.invalidCountry}
                />
              );
            }
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default AreaMap;
