import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import { useAdmin } from "../../../utils/AdminProvider";

const NotifyReports = ( {classes, amount} ) => {
    const { setSelectedComponent } = useAdmin();

    const [ hideNotification, setHideNotification ] = useState(false);

    const handleRedirect = () => {
        setSelectedComponent("commentReports");
    }

    const handleClose = () => {
        setHideNotification(true);
    }

    return <Box display={hideNotification && "none"} >
        <Card className={classes.notificationRoot}>
            <CardHeader
            action={
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            }
            title="Reports"
            subheader= {<React.Fragment>
                You have <b>{amount}</b> user experience reports to review.
            </React.Fragment>}
            />
            <Button variant="contained" color="primary" className={classes.notificationButton} onClick={handleRedirect}>
                Review
            </Button>
        </Card>
    </Box>
}

export default NotifyReports;