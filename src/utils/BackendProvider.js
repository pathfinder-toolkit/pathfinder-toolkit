import React, { useState, useContext, useEffect } from "react";

import axios from "axios";
import { useAuth0 } from "./react-auth0-spa";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const { getTokenSilently } = useAuth0();

  const getStoredBuildings = async () => {
    const token = await getTokenSilently();

    const address = process.env.REACT_APP_LOCAL_API_ROOT + "/buildings/me/";

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    
    try {
      const response = await axios.get(address, axiosConfig);
      console.log(response);
      if (Object.keys(response).includes("data")) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const requestAreas = async () => {
    const address = process.env.REACT_APP_API_ROOT + "/editor/areas";

    try {
      const response = await axios.get(address);
      console.log(response.data);

      const areas = response.data.map((area) => {
        return area.areaName;
      });

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

      const options = {
        materials: response.data.materials.map((material) => {
          return material.value;
        }),
        roofTypes: response.data.roofTypes.map((roofType) => {
          return roofType.value;
        }),
        ventilationTypes: response.data.ventilationTypes.map(
          (ventilationType) => {
            return ventilationType.value;
          }
        ),
        heatingTypes: response.data.heatingTypes.map((heatingType) => {
          return heatingType.value;
        }),
        buildingTypes: response.data.buildingTypes.map((buildingType) => {
          return buildingType.value;
        }),
      };
      console.log(options);

      return options;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const requestSuggestions = async (subject, value) => {
    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/suggestions/" + subject + "/" + value
    );

    console.log("get suggestions about: " + subject + " | " + value);

    try {
      const response = await axios.get(address);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const requestComments = async (subject) => {
    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/comments/" + subject + "/"
    );

    try {
      const response = await axios.get(address);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const requestBuildingModel = async () => {
    const address = process.env.REACT_APP_API_ROOT + "/building/"

    try {
      const response = await axios.get(address);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getBuildingFromSlug = async (slug) => {
    const address = process.env.REACT_APP_API_ROOT + "/building/" + slug;

    try {
      const response = await axios.get(address);
      console.log(response);
      if (Object.keys(response).includes("data")) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <BackendContext.Provider
      value={{
        requestAreas,
        requestAreaOptions,
        requestBuildingModel,
        getStoredBuildings,
        getBuildingFromSlug,
        requestSuggestions,
        requestComments,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
