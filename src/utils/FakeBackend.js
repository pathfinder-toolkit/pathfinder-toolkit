import React, { useState, useContext, useEffect } from "react";
import frontPageImage from "../external/images/frontpage_house.jpg";

import axios from "axios";
import { useAuth0 } from "./react-auth0-spa";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const { getTokenSilently } = useAuth0();
  
  const [materials, setMaterials] = useState();
  const [countries, setCountries] = useState();
  const [roofTypes, setRoofTypes] = useState();
  const [heatingTypes, setHeatingTypes] = useState();
  const [ventilationTypes, setVentilationTypes] = useState();
  const [buildingTypes, setBuildingTypes] = useState();
  
  const [loading, setLoading] = useState(true);
  const [optionsLoading, setOptionsLoading] = useState(true);

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

  const requestAreas = async () => {
    const address = process.env.REACT_APP_API_ROOT + "/editor/areas";
    try {
      const response = await axios.get(address)
      console.log(response.data)
      setCountries(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const requestAreaOptions = async (selectedArea) => {
    const address = encodeURI(process.env.REACT_APP_API_ROOT + "/editor/options/" + selectedArea);
    console.log("asd: " +  address);
    setOptionsLoading(true);
    try {
      const response = await axios.get(address)
      console.log(response.data)
      console.log(response.data.materials)
      setMaterials(response.data.materials);
      setRoofTypes(response.data.roofTypes);
      setVentilationTypes(response.data.ventilationTypes);
      setHeatingTypes(response.data.heatingTypes);
      setBuildingTypes(response.data.buildingTypes);
      console.log("here:");
      setOptionsLoading(false);
    } catch (error) {
      console.log("err:" + error);
    }
  }

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
      return response.data.data;
    } else {
      return null;
    }
  };

  return (
    <BackendContext.Provider
      value={{
        loading,
        optionsLoading,
        requestAreas,
        requestAreaOptions,
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
