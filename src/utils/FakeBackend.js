import React, { useState, useContext, useEffect } from "react";
import frontPageImage from "../external/images/frontpage_house.jpg"

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);



const useStateWithSessionStorage = sessionStorageKey => {
  const [value, setValue] = useState(
    sessionStorage.getItem(sessionStorageKey) || ''
  );
 
 useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, value);
  }, [value]);
 
  return [value, setValue];
};

export const BackendProvider = ({ children }) => {


  const [user, setUser] = useStateWithSessionStorage("userName");
  const [isLoggedIn, setIsLoggedIn] = useState(user || false);

  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState();
  const [countries, setCountries] = useState();
  const [roofTypes, setRoofTypes] = useState();
  const [heatingTypes, setHeatingTypes] = useState();
  const [ventilationTypes, setVentilationTypes] = useState();
  const [tips, setTips] = useState();

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
        setCountries(["Finland", "Sweden", "United Kingdom", "Ireland"]);
        setRoofTypes(["Roof 1", "Roof 2", "Roof 3"]);
        setVentilationTypes(["Gravity based" , "Machine based", "Mixed type"]);
        setHeatingTypes(["Heating 1", "Heating 2" , "Heating 3"]);
        setTips(["Replace heating system", "Remove windows & doors"], "Placeholder tip")
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
  }

  const getVentilationTypes = () => {
    return ventilationTypes;
  }

  const getHeatingTypes = () => {
    return heatingTypes;
  }

  const getCountries = () => {
    return countries;
  };

  const getTips = (tag) => {
    return tips;
  }

  const getSavedBuildings = async () => {
    const createData = (name, image, date, improvements, id) => {
      return { name, image, date, improvements, id };
    };

    const data = [
      createData("Burj Khalifa", frontPageImage, "2020-05-22 10:10:03", 12, 1),
      createData("Shanghai Tower", frontPageImage, "2020-05-24 13:25:01", 3, 2),
      createData("Makkah Royal Clock Tower", frontPageImage, "2020-05-25 12:10:03", 14, 3),
      createData("Ping An Finance Center", frontPageImage, "2020-05-26 15:22:08", 16, 4),
      createData("Lotte World Tower", frontPageImage, "2020-05-26 19:13:03", 21, 5),
      createData("One World Trade Center", frontPageImage, "2020-05-28 15:00:01", 5, 6),
      createData("Guangzhou CTF Finance Centre", frontPageImage, "2020-05-29 09:56:00", 7, 7),
      createData("Tianjin CTF Finance Centre", frontPageImage, "2020-05-31 15:12:43", 31, 8)
    ];

    return data;
  };

  const getBuildingFromSlug = async () => {
    const buildingInformation = {
      area: "Finland",
      details: {
        name: "Talo",
        year: "1900",
        material: "Stone",
        floors: "1",
      },
      structure: {
        wallMaterial: "Stone",
        roofType: "Roof 1",
        windowCount: "1",
      },
      ventilation: {
        system: "Gravity based",
        airTightness: "2",
      },
      heating: {
        system: "Heating 1",
      },
    }

    return buildingInformation;
  }

  

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
        getBuildingFromSlug
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
