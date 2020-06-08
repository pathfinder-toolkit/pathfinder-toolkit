import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const AreaMap = (props) => {
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const allowedCountries = props.allowedCountries;

  const validCountryStyle = {
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
  };

  const invalidCountryStyle = {
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
            if (allowedCountries.includes(geo.properties.NAME)) {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#9998A3"
                  stroke="#EAEAEC"
                  onClick={() => props.handleSelection(geo.properties.NAME)}
                  style={validCountryStyle}
                />
              );
            } else {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#9998A3"
                  stroke="#EAEAEC"
                  style={invalidCountryStyle}
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
