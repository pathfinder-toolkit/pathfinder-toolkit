import React, { useState, useContext } from "react";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [materials, setMaterials] = useState();
  const [countries, setCountries] = useState();
  const [roofTypes, setRoofTypes] = useState();

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

  const getCountries = () => {
    return countries;
  };

  const getSavedBuildings = async () => {
    let createData = (name, date, improvements, id) => {
      return { name, date, improvements, id };
    };

    const data = [
      createData("Burj Khalifa", "2020-05-22 10:10:03", 12, 1),
      createData("Shanghai Tower", "2020-05-24 13:25:01", 3, 2),
      createData("Makkah Royal Clock Tower", "2020-05-25 12:10:03", 14, 3),
      createData("Ping An Finance Center", "2020-05-26 15:22:08", 16, 4),
      createData("Lotte World Tower", "2020-05-26 19:13:03", 21, 5),
      createData("One World Trade Center", "2020-05-28 15:00:01", 5, 6),
      createData("Guangzhou CTF Finance Centre", "2020-05-29 09:56:00", 7, 7),
      createData("Tianjin CTF Finance Centre", "2020-05-31 15:12:43", 31, 8),
      createData("CITIC Tower", "2020-06-02 12:43:25", 35, 9),
      createData(
        "Shanghai World Financial Center",
        "2020-06-03 15:18:03",
        11,
        10
      ),
      createData(
        "International Commerce Centre",
        "2020-06-05 16:32:09",
        12,
        11
      ),
      createData("Lakhta Center", "2020-06-07 14:54:32", 16, 12),
      createData("Zifeng Tower", "2020-06-08 08:34:15", 25, 13),
    ];

    return data;
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
        getCountries,
        getSavedBuildings,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
