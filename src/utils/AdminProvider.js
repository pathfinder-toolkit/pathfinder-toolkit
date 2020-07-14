import React,  {useState, useContext } from "react";

import AdminDashboard from "../components/Admin/AdminDashboard";
import CreateNewSuggestion from "../components/Admin/Suggestions/CreateNewSuggestion";

export const AdminContext = React.createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ( { children } ) => {
    const [selectedComponent, setSelectedComponent] = React.useState("dashboard");


    const getComponent = () => { 
        switch (selectedComponent) {
            case "dashboard":
                return <AdminDashboard />;
            case "createNewSuggestion":
                return <CreateNewSuggestion />
            default:
                return <p>No component</p>
        }
    }
    return (
        
        <AdminContext.Provider
            value={{
                setSelectedComponent,
                getComponent
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}