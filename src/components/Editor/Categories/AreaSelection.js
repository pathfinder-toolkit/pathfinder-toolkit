import React, { useState, useEffect } from "react";
import { useBackend } from "../../../utils/BackendProvider";
import { useEditor } from "../../../utils/EditorProvider";
import AreaMap from "./AreaMap";
import { CircularProgress } from "@material-ui/core";

const AreaSelection = (props) => {
  const {
    setSavedProperty,
    getSavedProperty,
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
    async function fetchData() {
      const data = await requestAreas();
      let model;

      if (props.slug) {
        // If we are editing an existing building
        console.log("Editing: " + props.slug);
        model = await getBuildingFromSlug(props.slug);
        props.loadBuildingModel(model);
      } else {
        model = await requestBuildingModel();
        props.loadBuildingModel(
          JSON.parse(sessionStorage.getItem("SavedBuildingDataInStorage")) ||
            model
        );
      }

      /*props.loadBuildingModel(
        JSON.parse(sessionStorage.getItem("SavedBuildingDataInStorage")) ||
          model
      ); */
      setAllowedCountries(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setSelectedArea(getSavedProperty("details", "area"));
    }
  }, [loading]);

  useEffect(() => {
    async function fetchData() {
      console.log("here")
      const data = await requestAreaOptions(selectedArea);
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
