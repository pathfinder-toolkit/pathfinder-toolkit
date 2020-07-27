import React, { useState, useEffect } from "react";
import { useBackend } from "../../../utils/BackendProvider";
import { useEditor } from "../../../utils/EditorProvider";
import AreaMap from "./AreaMap";
import { CircularProgress } from "@material-ui/core";

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

  const [loading, setLoading] = useState(true);
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
        console.log("Editing: " + props.slug);
        model = await getBuildingFromSlug(props.slug);
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
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // If we have data in local storage from previously edited building
    // and we want to create a new building,
    // the previous data needs to be cleared.
    const resetBuildingData = async () => {
      if (buildingInformation && !props.slug) {
        console.log("Invalid building data in storage, removing");
        console.log(Object.keys(buildingInformation));
        if (Object.keys(buildingInformation).includes("slug")) {
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
    if (!loading) {
      setSelectedArea(getSavedProperty("details", "area"));
    }
  }, [loading]);

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
      {loading && <CircularProgress />}
      {!loading && (
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
