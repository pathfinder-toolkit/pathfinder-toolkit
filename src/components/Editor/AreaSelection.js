import React, { useState, useEffect } from "react";
import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import AreaMap from "./AreaMap";

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
      console.log("fetching options:");
      const data = await requestAreaOptions(selectedArea);
      setBuildingOptions(data);
    }
    fetchData();
  }, [selectedArea]);

  useEffect(() => {
    if (selectedArea !== '') {
      requestAreaOptions(selectedArea);
      setNavigationEnabled(true);
    }
  }, []);

  const handleSelection = (selectedCountry) => {
    setSelectedArea(selectedCountry);
    //requestAreaOptions(selectedCountry);
    setSavedProperty("details", "area", selectedCountry);
    setNavigationEnabled(true);
  };

  return (
    <React.Fragment>
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
