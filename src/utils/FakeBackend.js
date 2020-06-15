import React, { useState, useContext, useEffect } from "react";
import frontPageImage from "../external/images/frontpage_house.jpg";

import axios from "axios";
import { useAuth0 } from "./react-auth0-spa";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

const useStateWithSessionStorage = (sessionStorageKey) => {
  const [value, setValue] = useState(
    sessionStorage.getItem(sessionStorageKey) || ""
  );

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, value);
  }, [value]);

  return [value, setValue];
};

export const BackendProvider = ({ children }) => {
  const { getTokenSilently } = useAuth0();
  const [user, setUser] = useStateWithSessionStorage("userName");
  const [isLoggedIn, setIsLoggedIn] = useState(user || false);

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

  const fakeLogin = (username) => {
    if (username === null || username === "") {
      console.log("invalid username");
      return;
    }

    setUser(username);
    setIsLoggedIn(true);
    console.log("logged in as: " + username);
  };

  const fakeLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    console.log("logged out");
  };

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

  const getSavedBuildings = async () => {
    const createData = (name, image, date, improvements, id) => {
      return { name, image, date, improvements, id };
    };

    const data = [
      createData("Burj Khalifa", frontPageImage, "2020-05-22 10:10:03", 12, 1),
      createData("Shanghai Tower", frontPageImage, "2020-05-24 13:25:01", 3, 2),
      createData(
        "Makkah Royal Clock Tower",
        frontPageImage,
        "2020-05-25 12:10:03",
        14,
        3
      ),
      createData(
        "Ping An Finance Center",
        frontPageImage,
        "2020-05-26 15:22:08",
        16,
        4
      ),
      createData(
        "Lotte World Tower",
        frontPageImage,
        "2020-05-26 19:13:03",
        21,
        5
      ),
      createData(
        "One World Trade Center",
        frontPageImage,
        "2020-05-28 15:00:01",
        5,
        6
      ),
      createData(
        "Guangzhou CTF Finance Centre",
        frontPageImage,
        "2020-05-29 09:56:00",
        7,
        7
      ),
      createData(
        "Tianjin CTF Finance Centre",
        frontPageImage,
        "2020-05-31 15:12:43",
        31,
        8
      ),
    ];

    return data;
  };

  const getBuildingFromSlug = async () => {
    const buildingInformation = {
      details: {
        name: {
          propertyName: "Name",
          value: "House",
          suggestions: [],
          comments: [],
        },
        area: {
          propertyName: "Area",
          value: "Finland",
          suggestions: [],
          comments: [],
        },
        year: {
          propertyName: "Construction year",
          value: "1900",
          suggestions: [],
          comments: [],
        },
        material: {
          propertyName: "Material",
          value: "Wood",
          suggestions: [],
          comments: [],
        },
        floors: {
          propertyName: "Amount of floors",
          value: 1,
          suggestions: [],
          comments: [],
        },
      },
      structure: {
        wallMaterial: {
          propertyName: "Wall material",
          value: "Stone",
          suggestions: [
            {
              suggestionText:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac quam ornare, venenatis enim ut, condimentum magna. Suspendisse in rutrum nisl. Phasellus lacinia dolor eu pulvinar lobortis. ",
              priority: 15,
            },
          ],
          comments: [],
        },
        roofType: {
          propertyName: "Roof material",
          value: "Roof 1",
          suggestions: [
            {
              suggestionText:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac quam ornare, venenatis enim ut, condimentum magna. Suspendisse in rutrum nisl. Phasellus lacinia dolor eu pulvinar lobortis. ",
              priority: 30,
            },
          ],
          comments: [],
        },
        windowCount: {
          propertyName: "Amount of windows",
          value: 8,
          suggestions: [
            {
              suggestionText:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac quam ornare, venenatis enim ut, condimentum magna. Suspendisse in rutrum nisl. Phasellus lacinia dolor eu pulvinar lobortis. ",
              priority: 45,
            },
          ],
          comments: [],
        },
      },
      ventilation: {
        system: {
          propertyName: "Ventilation system",
          value: "Machine based",
          suggestions: [
            {
              suggestionText:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac quam ornare, venenatis enim ut, condimentum magna. Suspendisse in rutrum nisl. Phasellus lacinia dolor eu pulvinar lobortis. ",
              priority: 0,
            },
          ],
          comments: [],
        },
        airTightness: {
          propertyName: "Air tightness",
          value: 10,
          suggestions: [
            {
              suggestionText:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac quam ornare, venenatis enim ut, condimentum magna. Suspendisse in rutrum nisl. Phasellus lacinia dolor eu pulvinar lobortis. ",
              priority: 1,
            },
          ],
          comments: [],
        },
      },
      heating: {
        system: {
          propertyName: "Heating system",
          value: "Oil",
          suggestions: [
            {
              suggestionText:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac quam ornare, venenatis enim ut, condimentum magna. Suspendisse in rutrum nisl. Phasellus lacinia dolor eu pulvinar lobortis. ",
              priority: 100,
            },
          ],
          comments: [
            {
              author: "John Doe",
              sentiment: "positive",
              date: "2020-06-08 11:23:05",
              commentText: 
                "Mauris molestie ex varius enim vehicula, eget fringilla nunc dictum. Fusce sed lacinia dui. Phasellus accumsan, sem vel viverra hendrerit, turpis libero lobortis leo, vitae suscipit leo diam nec sem. Sed id laoreet elit, hendrerit suscipit eros. Praesent in viverra est, et auctor nibh."
            },
            {
              date: "2020-06-09 10:45:06",
              sentiment: "negative",
              commentText: 
                "Mauris molestie ex varius enim vehicula, eget fringilla nunc dictum. Fusce sed lacinia dui. Phasellus accumsan, sem vel viverra hendrerit, turpis libero lobortis leo, vitae suscipit leo diam nec sem. Sed id laoreet elit, hendrerit suscipit eros. Praesent in viverra est, et auctor nibh."
            },
            {
              author: "Jane Doe",
              sentiment: "neutral",
              date: "2020-06-10 09:22:53",
              commentText: 
                "Mauris molestie ex varius enim vehicula, eget fringilla nunc dictum. Fusce sed lacinia dui. Phasellus accumsan, sem vel viverra hendrerit, turpis libero lobortis leo, vitae suscipit leo diam nec sem. Sed id laoreet elit, hendrerit suscipit eros. Praesent in viverra est, et auctor nibh."
            }
          ]
        },
      }
    }

    return buildingInformation;
  };

  return (
    <BackendContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        fakeLogin,
        fakeLogout,
        fakeRequest,
        getMaterials,
        getRoofTypes,
        getVentilationTypes,
        getHeatingTypes,
        getCountries,
        getSavedBuildings,
        getTips,
        getBuildingTypes,
        getBuildingFromSlug,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
