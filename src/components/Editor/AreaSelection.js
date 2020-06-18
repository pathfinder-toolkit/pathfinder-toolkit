import React, { useState, useEffect } from "react";
import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import AreaMap from "./AreaMap";
import { CircularProgress } from "@material-ui/core";

const AreaSelection = () => {
  const {
    setSavedProperty,
    getSavedProperty,
    setNavigationEnabled,
    setBuildingOptions,
  } = useEditor();

  const { requestAreaOptions, requestAreas } = useBackend();

  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState(
    getSavedProperty("details", "area")
  );
  const [allowedCountries, setAllowedCountries] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await requestAreas();
      setAllowedCountries(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await requestAreaOptions(selectedArea);
      setBuildingOptions(data);
      setNavigationEnabled(true);
    }
    if (selectedArea !== "") {
      fetchData();
    }
  }, [,selectedArea]);

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
