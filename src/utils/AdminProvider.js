import React,  {useState, useContext } from "react";

import AdminDashboard from "../components/Admin/AdminDashboard";
import CreateNewSuggestion from "../components/Admin/Suggestions/CreateNewSuggestion";
import EditSuggestions from "../components/Admin/Suggestions/EditSuggestions";
import DeleteSuggestions from "../components/Admin/Suggestions/DeleteSuggestions";
import EmailSettings from "../components/Admin/Feedback/EmailSettings";
import UpdateRegionOptions from "../components/Admin/Editor/UpdateRegionOptions";
import ManageCommentReports from "../components/Admin/Comments/ManageCommentReports";

export const AdminContext = React.createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ( { children } ) => {
    const [selectedComponent, setSelectedComponent] = React.useState("dashboard");

    const getComponent = (style) => { 
        switch (selectedComponent) {
            case "dashboard":
                return <AdminDashboard style={style} />;
            case "createNewSuggestion":
                return <CreateNewSuggestion style={style} />;
            case "editSuggestions":
                return <EditSuggestions style={style} />;
            case "deleteSuggestions":
                return <DeleteSuggestions style={style} />;
            case "emailSettings":
                return <EmailSettings style={style} />;
            case "regionOptions":
                return <UpdateRegionOptions style={style} />;
            case "commentReports":
                return <ManageCommentReports style={style} />
            default:
                return <p>No component</p>;
        }
    }

    return (
        
        <AdminContext.Provider
            value={{
                setSelectedComponent,
                getComponent,
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}