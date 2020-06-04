import React, { useState, useEffect, useContext } from "react";

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

  return (
    <BackendContext.Provider
      value={{
        isLoggedIn,
        user,
        fakeLogin,
        fakeLogout,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
