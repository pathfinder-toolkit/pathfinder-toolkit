import React, { useState, useEffect } from "react";
import { useBackend } from "../../../utils/BackendProvider";
import { useEditor } from "../../../utils/EditorProvider";
import AreaMap from "./AreaMap";
import { CircularProgress } from "@material-ui/core";

import { useAuth0 } from "../../../utils/react-auth0-spa";

const AreaSelection = (props) => {
  const {
    setSavedProperty,
    getSavedProperty,
    buildingInformation,
    setNavigationEnabled,
    setBuildingOptions,
  } = useEditor();

  const {
    requestBuildingModel,
    requestAreaOptions,
    requestAreas,
    getBuildingFromSlug,
  } = useBackend();

  const { loading } = useAuth0();

  const [mapLoading, setMapLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState("");
  const [allowedCountries, setAllowedCountries] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await requestAreas();

      console.log(data);

      //Get areaNames from array
      let areaNames = [];
      data.forEach((item) => areaNames.push(item.areaName));

      console.log(areaNames);

      console.log(data);

      let model;

      if (props.slug) {
        // If we are editing an existing building
        console.log("Editing existing building: " + props.slug);
        model = await getBuildingFromSlug(props.slug);
        props.loadBuildingModel(model);
      } else {
        // New building
        console.log("New building");
        model = await requestBuildingModel();

        props.loadBuildingModel(
          JSON.parse(sessionStorage.getItem("SavedBuildingDataInStorage")) ||
            model
        );
      }

      setAllowedCountries(data);
      setMapLoading(false);
    };
    if (!loading) {
      fetchData();
    }
  }, [loading]);

  useEffect(() => {
    // If we have data in local storage from previously edited building
    // and we want to create a new building,
    // the previous data needs to be cleared.
    const resetBuildingData = async () => {
      if (buildingInformation && !props.slug) {
        console.log(Object.keys(buildingInformation));
        if (Object.keys(buildingInformation).includes("slug")) {
          console.log("Invalid building data in storage, removing");

          const model = await requestBuildingModel();
          props.loadBuildingModel(model);
          setSelectedArea("");
          setNavigationEnabled(false);
        }
      }
    };

    resetBuildingData();
  }, [buildingInformation]);

  useEffect(() => {
    if (!mapLoading) {
      setSelectedArea(getSavedProperty("details", "area"));
    }
  }, [mapLoading]);

  useEffect(() => {
    console.log(selectedArea);
    async function fetchData() {
      const data = await requestAreaOptions(findAreaIdByName(selectedArea));
      setBuildingOptions(data);
      setNavigationEnabled(true);
    }
    if (selectedArea !== "") {
      fetchData();
    }
  }, [selectedArea]);

  const handleSelection = (selectedCountry) => {
    setSelectedArea(selectedCountry);
    setSavedProperty("details", "area", selectedCountry);
  };

  // Need to refine this solution later on.
  const findAreaIdByName = (areaName) => {
    let areaId = allowedCountries.filter((area) => {
      return area.areaName === areaName;
    });
    areaId = areaId[0].idArea;

    return areaId;
  };

  return (
    <React.Fragment>
      {mapLoading && <CircularProgress />}
      {!mapLoading && (
        <AreaMap
          allowedCountries={allowedCountries}
          selectedCountry={selectedArea}
          handleSelection={handleSelection}
        ></AreaMap>
      )}
    </React.Fragment>
  );
};

export default AreaSelection;
