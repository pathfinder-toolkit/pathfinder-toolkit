import React,  {useState, useContext } from "react";

import AdminDashboard from "../components/Admin/AdminDashboard";
import CreateNewSuggestion from "../components/Admin/Suggestions/CreateNewSuggestion";
import EditSuggestions from "../components/Admin/Suggestions/EditSuggestions";
import DeleteSuggestions from "../components/Admin/Suggestions/DeleteSuggestions";
import EmailSettings from "../components/Admin/Feedback/EmailSettings";

import axios from "axios";

import { useAuth0 } from "./react-auth0-spa";

export const AdminContext = React.createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ( { children } ) => {
    const [selectedComponent, setSelectedComponent] = React.useState("dashboard");

    const { getTokenSilently } = useAuth0();


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
            default:
                return <p>No component</p>;
        }
    }

    const getFeedbackRecipients = async () => {
        const token = await getTokenSilently();

        const address = encodeURI(
            process.env.REACT_APP_LOCAL_API_ROOT + '/admin/feedback/recipients'
        );

        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        };

        try {
            const response = await axios.get(address, axiosConfig)
            console.log(response);
            return response;
        } catch (error) {
            console.log(error.response.data);
            return error.response;
        }
    }

    return (
        
        <AdminContext.Provider
            value={{
                setSelectedComponent,
                getComponent,
                getFeedbackRecipients
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}