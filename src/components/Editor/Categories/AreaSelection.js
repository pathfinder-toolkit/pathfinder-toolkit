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
    setSuggestionsAreaId,
    setBuildingNameEntered,
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

      //Get areaNames from array
      let areaNames = [];
      data.forEach((item) => areaNames.push(item.areaName));

      // new Building template, OR existing building
      let model;

      if (props.slug) {
        // If we are editing an existing building
        setBuildingNameEntered(true);

        const response = await getBuildingFromSlug(props.slug);
        model = response.data;
        props.loadBuildingModel(model);
      } else {
        // New building
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
    // If building name is stored in local storage,
    // allow user to navigate freely.
    if (buildingInformation) {
      if (buildingInformation.details.name.value.length > 0) {
        setBuildingNameEntered(true);
      }
    }
    if (buildingInformation && !props.slug) {
      resetBuildingData();
    }
  }, [buildingInformation]);

  // If we have data in local storage from previously edited building
  // and we want to create a new building,
  // the previous data needs to be cleared.
  const resetBuildingData = async () => {
    console.log(Object.keys(buildingInformation));
    if (Object.keys(buildingInformation).includes("slug")) {
      console.log("Invalid building data in storage, removing");

      const model = await requestBuildingModel();
      props.loadBuildingModel(model);
      setSelectedArea("");
      setNavigationEnabled(false);
    }
  };

  useEffect(() => {
    if (!mapLoading) {
      setSelectedArea(getSavedProperty("details", "area"));
      setSuggestionsAreaId(sessionStorage.getItem("suggestionAreaId"));
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
    setSuggestionsAreaId(findAreaIdByName(selectedCountry));
    sessionStorage.setItem(
      "suggestionAreaId",
      findAreaIdByName(selectedCountry)
    );
  };

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
