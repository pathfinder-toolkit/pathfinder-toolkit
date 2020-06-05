import React, { useState, useContext } from "react";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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

  const getMaterials = () => {
    return ["Wood", "Stone", "Concrete"];
  }

  return (
    <BackendContext.Provider
      value={{
        isLoggedIn,
        user,
        fakeLogin,
        fakeLogout,
        getMaterials,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
