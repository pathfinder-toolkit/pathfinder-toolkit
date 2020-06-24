import React, { useState, useContext, useEffect } from "react";

import axios from "axios";
import { useAuth0 } from "./react-auth0-spa";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const { getTokenSilently } = useAuth0();

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

  const requestAreas = async () => {
    const address = process.env.REACT_APP_LOCAL_API_ROOT + "/editor/areas";

    try {
      const response = await axios.get(address);
      console.log(response.data);

      let areas = [];
      response.data.forEach((areaObject) => {
        areas.push(areaObject.areaName)
      });
      console.log(areas);

      return areas;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const requestAreaOptions = async (selectedArea) => {
    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/editor/options/" + selectedArea
    );
    try {
      const response = await axios.get(address);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
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
        requestAreas,
        requestAreaOptions,
        getStoredBuildings,
        getBuildingFromSlug,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
