import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const AreaSelection = () => {
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  return (
    <ComposableMap
      width="800"
      height="350"
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-20.0, -60.0, 0],
        scale: 600,
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#9998A3"
              stroke="#EAEAEC"
              style={{
                default: {
                  fill: "#D6D6DA",
                  outline: "none",
                },
                hover: {
                  fill: "#F53",
                  outline: "none",
                },
                pressed: {
                  fill: "#E42",
                  outline: "none",
                },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default AreaSelection;
