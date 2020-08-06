import React, { useState, useEffect } from "react";

import NotifyReports from "./NotifyReports";

import { useBackend } from "../../../utils/BackendProvider";

const AdminNotifications = ( {classes} ) => {
    const {
        getCommentReportsAmountForAdmin
    } = useBackend();

    const [reportAmount, setReportAmount] = useState(false);

    const fetchAmountOfReports = async () => {
        const response = await getCommentReportsAmountForAdmin();
        if (response.status === 200) {
            if (response.data.amount > 0) {
                setReportAmount(response.data.amount);
            }
            
        }
    }

    useEffect(() => {
        fetchAmountOfReports();
    },[]);

    return <React.Fragment>
        {reportAmount && <NotifyReports classes={classes} amount={reportAmount}/>}
    </React.Fragment>
}

export default AdminNotifications;