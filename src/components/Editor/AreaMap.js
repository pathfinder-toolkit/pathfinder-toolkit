import React from "react";
import mapData from "../../json/mapdata_test.json"
import { ComposableMap, Geographies, Geography, Annotation } from "react-simple-maps";

const AreaMap = (props) => {
  const geoUrl = mapData;

  const allowedCountries = props.allowedCountries;
  const selectedCountry = props.selectedCountry;

  const mapConfig = {
    rotate: [-20.0, -62.5, 0],
    scale: 850,
  }

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
      projectionConfig={mapConfig}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            if (selectedCountry === geo.properties.NAME) {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#EAEAEC"
                  style={styles.selectedCountry}
                />
              );
            } else if (allowedCountries.includes(geo.properties.NAME)) {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
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
                  stroke="#EAEAEC"
                  style={styles.invalidCountry}
                />
              );
            }
          })
        }
      </Geographies>
      {selectedCountry && (<Annotation
        connectorProps={null}
        subject={[-8, 46]}
        dx={0}
        dy={0}
      >
        <rect x="-115" y="-25" rx="15" width="230" height="44" fill="none" stroke="#000000" strokeWidth="2"></rect>
         <text textAnchor="middle">
          Selected area: {selectedCountry}
        </text>
      </Annotation>)}
    </ComposableMap>
  );
};

export default AreaMap;
