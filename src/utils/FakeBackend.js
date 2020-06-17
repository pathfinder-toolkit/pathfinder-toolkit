import React, { useState, useContext, useEffect } from "react";
import frontPageImage from "../external/images/frontpage_house.jpg";

import axios from "axios";
import { useAuth0 } from "./react-auth0-spa";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const { getTokenSilently } = useAuth0();

  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState();
  const [countries, setCountries] = useState();
  const [roofTypes, setRoofTypes] = useState();
  const [heatingTypes, setHeatingTypes] = useState();
  const [ventilationTypes, setVentilationTypes] = useState();
  const [buildingTypes, setBuildingTypes] = useState();
  const [tips, setTips] = useState();

  const testRequest = async () => {
    const address = process.env.REACT_APP_API_ROOT + "/buildings";
    console.log("test: " + address);
    try {
      const response = await axios.get(address);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    testRequest();
  }, []);


  const fakeRequest = async () => {
    const result = await fakeResponse();
    console.log("result: " + result);
  };

  const fakeResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMaterials(["Wood", "Stone", "Concrete"]);
        setCountries([
          "Southern Finland",
          "Northern Finland",
          "Southern Sweden",
          "Northern Sweden",
          "Scotland",
          "Northern Ireland",
          "Ireland",
          "Faroe Islands",
        ]);
        setRoofTypes(["Roof 1", "Roof 2", "Roof 3"]);
        setVentilationTypes(["Gravity based", "Machine based", "Mixed type"]);
        setHeatingTypes(["Heating 1", "Heating 2", "Heating 3"]);
        setTips(
          ["Replace heating system", "Remove windows & doors"],
          "Placeholder tip"
        );
        setBuildingTypes(["Building 1", "Building 2", "Building 3"]);
        resolve("resolved");
        setLoading(false);
      }, 2000);
    });
  };

  const getMaterials = () => {
    return materials;
  };

  const getRoofTypes = () => {
    return roofTypes;
  };

  const getVentilationTypes = () => {
    return ventilationTypes;
  };

  const getHeatingTypes = () => {
    return heatingTypes;
  };

  const getCountries = () => {
    return countries;
  };

  const getTips = (tag) => {
    return tips;
  };

  const getBuildingTypes = () => {
    return buildingTypes;
  };

  const getStoredBuildings = async () => {

    //const token = await getTokenSilently();

    const address = process.env.REACT_APP_API_ROOT + "/buildings/me/";

    /*let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios.get(address, axiosConfig).then((response) => {
      setUserScore(response.data.score);
    });*/

    const response = await axios.get(address);
    console.log(response);
    if (Object.keys(response).includes("data")) {
      return response.data;
    } else {
      return null;
    }
  };

  const getBuildingFromSlug = async (slug) => {

    const address = process.env.REACT_APP_API_ROOT + "/building/" + slug;

    const response = await axios.get(address);
    console.log(response);
    if (Object.keys(response).includes("data")) {
      return response.data;
    } else {
      return null;
    }
  };

  return (
    <BackendContext.Provider
      value={{
        loading,
        fakeRequest,
        getMaterials,
        getRoofTypes,
        getVentilationTypes,
        getHeatingTypes,
        getCountries,
        getStoredBuildings,
        getTips,
        getBuildingTypes,
        getBuildingFromSlug,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
