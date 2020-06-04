import React, { useState, useEffect, useContext } from "react";

export const BackendContext = React.createContext();

export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const fakeLogin = (username) => {
    setUser(username);
    setIsLoggedIn(true);
  };

  const fakeLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <BackendContext.Provider
      value={{
        isLoggedIn,
        user,
        fakeLogin,
        fakeLogout
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
