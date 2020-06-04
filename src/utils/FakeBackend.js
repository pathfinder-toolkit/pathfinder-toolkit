import React, { useState, useEffect, useContext } from "react";

export const BackendContext = React.createContext();

export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ( {children }) => {

    const [testValue, setTestvalue] = useState("Building");

    const getTestValue = () => {
        return testValue;
    }


    return (<BackendContext.Provider
        value={{
            testValue,
            getTestValue
        }}>
          {children}
    </BackendContext.Provider>
        )

}