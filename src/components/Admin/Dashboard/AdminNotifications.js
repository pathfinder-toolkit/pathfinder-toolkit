import React, { useState, useEffect } from "react";

import NotifyReports from "./NotifyReports";

import { useBackend } from "../../../utils/BackendProvider";

const AdminNotifications = ( {classes} ) => {
    const {
        getCommentReportsAmountForAdmin
    } = useBackend();

    const [reportAmount, setReportAmount] = useState(0);

    const fetchAmountOfReports = async () => {
        const response = await getCommentReportsAmountForAdmin();
        console.log(response);
        if (response.status === 200) {
            setReportAmount(response.data.amount);
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