import React, { useState, useContext } from "react";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [materials, setMaterials] = useState();
  const [countries, setCountries] = useState();

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
        resolve("resolved");
        setLoading(false);
      }, 2000);
    });
  };

  const getMaterials = () => {
    return materials;
  };

  const getCountries = () => {
    return countries;
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
        getCountries,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
