import React, { useContext } from "react";

import axios from "axios";
import { useAuth0 } from "./react-auth0-spa";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const { getTokenSilently, loading } = useAuth0();

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
    const address = encodeURI(process.env.REACT_APP_API_ROOT + "/editor/areas");

    try {
      const response = await axios.get(address);
      console.log(response.data);

      //const areas = response.data.map((area) => {
      //  return [area.areaName, area.idArea];
      // });

      return response.data;

      //return areas;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const requestAreaOptions = async (areaId) => {
    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/editor/options/" + areaId
    );

    try {
      const response = await axios.get(address);

      const options = {};

      for (const component of response.data.components) {
        options[component.componentName] = component.options;
      }
      console.log(options);

      return options;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const requestSuggestions = async (subject, value, area) => {
    const address = encodeURI(
      process.env.REACT_APP_API_ROOT +
        "/suggestions/" +
        subject +
        "/" +
        value +
        "?area= " +
        area
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

  const requestComments = async (subject, page = 1, perPage = 3) => {
    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/comments/${subject}?page=${page}&perPage=${perPage}`
    );

    try {
      const response = await axios.get(address);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  const requestBuildingModel = async () => {
    const address = encodeURI(process.env.REACT_APP_API_ROOT + "/building/");

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
      return response;
    } catch (error) {
      console.log(error);
      return error.response
    }
  };

  const submitNewBuilding = async (requestBody) => {
    const token = await getTokenSilently();

    const address = encodeURI(process.env.REACT_APP_API_ROOT + "/building");

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
  };

  const submitNewComment = async (requestBody) => {
    const token = await getTokenSilently();

    const address = encodeURI(process.env.REACT_APP_API_ROOT + "/comments");

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
  };

  const uploadUserImage = async (file) => {
    const token = await getTokenSilently();

    const address = encodeURI(process.env.REACT_APP_API_ROOT + "/image");

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
  };

  const requestUserImages = async () => {
    const token = await getTokenSilently();

    const address = encodeURI(process.env.REACT_APP_API_ROOT + "/images");

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

  const requestImageDeletion = async (id) => {
    const token = await getTokenSilently();

    const address = encodeURI(process.env.REACT_APP_API_ROOT + "/image/" + id);

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.delete(address, axiosConfig);
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

  const requestAdminPrivileges = async () => {
    const token = await getTokenSilently();

    const address = encodeURI(process.env.REACT_APP_API_ROOT + "/admin");

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
      return null;
    }
  };

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
  };

  const getFeedbackRecipients = async () => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/admin/feedback/recipients"
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
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  };

  const updateFeedbackRecipients = async (request) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/admin/feedback/recipients"
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    try {
      const response = await axios.put(address, request, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  };

  const getSuggestionSubjectsForAdmin = async () => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/admin/suggestions/subjects`
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
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  };

  const getSuggestionSubjectOptions = async (identifier, areas) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/admin/suggestions/subject/${identifier}/?areas=${areas}`
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
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  };

  const submitNewSuggestion = async (request) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + "/admin/suggestion"
    );

    console.log(request);

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.post(address, request, axiosConfig);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateAreaOptions = async (identifier, areas, request) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/admin/options/${identifier}?areas=${areas}`
    );
    console.log(request);

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.put(address, request, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  const editSuggestion = async (request, id) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + `/admin/suggestion/${id}`
    );

    console.log(request);

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.put(address, request, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  const adminDeleteSuggestion = async (id) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      process.env.REACT_APP_API_ROOT + `/admin/suggestion/${id}`
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.delete(address, axiosConfig);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getAdminSuggestions = async (identifier) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/admin/suggestions/all/${identifier}`
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
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  };

  const updateBuildingData = async (slug, requestBody) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/building/${slug}`
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    try {
      const response = await axios.put(address, requestBody, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  };

  const deleteBuilding = async (slug) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/building/${slug}`
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    try {
      const response = await axios.delete(address, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  };

  const submitReportOnComment = async (idComment, requestBody) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/comment/report/${idComment}`
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.post(address, requestBody, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  }

  const deleteCommentAsAdmin = async (idComment) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/admin/comment/${idComment}`
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.delete(address, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  }

  const getCommentReportsAmountForAdmin = async () => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/admin/comments/reports/amount`
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
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  }

  const getCommentReportsForAdmin = async (page = 1, perPage = 5) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/admin/comments/reports?page=${page}&perPage=${perPage}`
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
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  }

  const rejectSelectedReportAsAdmin = async (idReport) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/admin/comments/report/reject/${idReport}`
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.patch(address, null, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  }

  const approveSelectedReportAsAdmin = async (idReport) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/admin/comments/report/approve/${idReport}`
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.patch(address, null, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  }

  const updateBuildingPublicStatus = async (slug, requestBody) => {
    const token = await getTokenSilently();

    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/building/${slug}`
    );

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.patch(address, requestBody, axiosConfig);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  }

  const getPublicBuildingFromSlug = async (slug) => {
    const address = encodeURI(
      `${process.env.REACT_APP_API_ROOT}/building/public/${slug}`
    );

    try {
      const response = await axios.get(address);
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
        getSuggestionSubjectsForAdmin,
        getSuggestionSubjectOptions,
        submitNewSuggestion,
        editSuggestion,
        adminDeleteSuggestion,
        getAdminSuggestions,
        updateAreaOptions,
        updateBuildingData,
        deleteBuilding,
        submitReportOnComment,
        deleteCommentAsAdmin,
        getCommentReportsAmountForAdmin,
        getCommentReportsForAdmin,
        rejectSelectedReportAsAdmin,
        approveSelectedReportAsAdmin,
        updateBuildingPublicStatus,
        getPublicBuildingFromSlug
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
