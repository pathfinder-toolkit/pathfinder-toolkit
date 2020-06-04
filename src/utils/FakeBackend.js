import React, { useState, useEffect, useContext } from "react";

export const BackendContext = React.createContext();

export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const [user, setUser] = useState("User");

  const getUser = () => {
    return user;
  };

  return (
    <BackendContext.Provider
      value={{
        getUser
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
