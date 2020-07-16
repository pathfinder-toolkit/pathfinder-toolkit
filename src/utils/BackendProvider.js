import React, { useState, useContext, useEffect } from "react";

import axios from "axios";
import { useAuth0 } from "./react-auth0-spa";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);



export const BackendProvider = ({ children }) => {
  const { getTokenSilently } = useAuth0();

  const getStoredBuildings = async () => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/buildings/me/"
    );

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
    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/editor/areas"
    );

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
      process.env.REACT_APP_API_ROOT + "/suggestions/" + subject + "/" + "1"
    ); 
    //value

    /*const address = encodeURI(
      "http://localhost:3300" + "/suggestions/" + subject + "/" + value
    );*/

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
    const amount = Math.floor(Math.random() * 5);
    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/comments/" + subject + "/" + amount
    );

    /*const address = encodeURI(
      "http://localhost:3300" + "/comments/" + subject
    ); */

    try {
      const response = await axios.get(address);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const requestBuildingModel = async () => {
    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/building/"
    );

    try {
      const response = await axios.get(address);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getBuildingFromSlug = async (slug) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/building/" + slug
    );

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

  const submitNewBuilding = async (requestBody) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/building"
    );

    console.log(requestBody);

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.post(address, requestBody, axiosConfig);
      console.log(response);
      if (Object.keys(response).includes("data")) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }

  }

  const submitNewComment = async (requestBody) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/comments"
    );

    console.log(requestBody);

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.post(address, requestBody, axiosConfig);
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
  }

  const uploadUserImage = async (file) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + '/image'
    );
    
    console.log("File:");
    console.log(file);

    const axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(address, formData, axiosConfig);
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
  }

  const requestUserImages = async () => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + '/images'
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    };

    try {
      const response = await axios.get(address, axiosConfig);
      console.log(response);
      if (Object.keys(response).includes("data")) {
        return response.data
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  
  }

  const requestImageDeletion= async (id) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + '/image/' + id
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    };

    try {
      const response = await axios.delete(address, axiosConfig);
      console.log(response);
      if (Object.keys(response).includes("data")) {
        return response.data
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  
  }

  const requestAdminPrivileges = async () => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + '/admin'
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
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
      return null
    }
  }

  const sendFeedbackWithRecaptcha = async (requestBody) => {
    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/feedback/recaptcha"
    );

    try {
      const response = await axios.post(address, requestBody);
      console.log(response);
      if (Object.keys(response).includes("data")) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  }

  const getFeedbackRecipients = async () => {
    const token = await getTokenSilently();

    const address = encodeURI(
        process.env.REACT_APP_API_ROOT + '/admin/feedback/recipients'
    );

    const axiosConfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    };

    try {
        const response = await axios.get(address, axiosConfig)
        console.log(response);
        return response;
    } catch (error) {
        console.log(error.response.data);
        return error.response;
    }
  }

  const updateFeedbackRecipients = async (request) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + '/admin/feedback/recipients'
    );

    const axiosConfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    };
    try {
      const response = await axios.put(address, request, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  }


  
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
        submitNewBuilding,
        submitNewComment,
        uploadUserImage,
        requestUserImages,
        requestImageDeletion,
        requestAdminPrivileges,
        sendFeedbackWithRecaptcha,
        getFeedbackRecipients,
        updateFeedbackRecipients,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
