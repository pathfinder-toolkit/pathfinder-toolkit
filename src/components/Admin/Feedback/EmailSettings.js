import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import { useAdmin } from "../../../utils/AdminProvider";

const EmailSettings = (props) => {
    const classes = props.style;

    const { getFeedbackRecipients } = useAdmin();
    const [ pending, setPending ] = useState(false);
    const [ recipients, setRecipients ] = useState(false);

    const updateFeedbackRecipientList = async () => {
        setPending(true);
        const response = await getFeedbackRecipients();
        if (response.status === 200) {
            recipients = response.data;
        }
    }

    const _onClick = async () => {
        console.log("clicked");
        const response = await getFeedbackRecipients();
        console.log(response);
    }

    return <React.Fragment>
        <Typography variant="h4" component="h4" className={classes.header}>Recipient e-mail settings</Typography>
        <Button onClick={_onClick}>Test button</Button>
    </React.Fragment>
}

export default EmailSettings;