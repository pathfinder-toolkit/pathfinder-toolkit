import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useBackend } from "../../../utils/BackendProvider";

const EmailSettings = (props) => {
    const classes = props.style;

    const { getFeedbackRecipients, updateFeedbackRecipients } = useBackend();
    const [ pending, setPending ] = useState(false);
    const [ recipients, setRecipients ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ newRecipient, setNewRecipient ] = useState("")

    const refreshFeedbackRecipientList = async () => {
        setPending(true);
        setError(false);
        setRecipients(false);
        const response = await getFeedbackRecipients();
        if (response.status === 200) {
            console.log(response.data);
            setRecipients(response.data);
        } else {
            setError(response.data)
        }
        setPending(false);
    }

    useEffect(() => {
        refreshFeedbackRecipientList();
    },[])

    const _handleChange = (e) => {
        setNewRecipient(e.target.value);
    }

    const _onClick = async () => {
        const request = [
            {
                email: newRecipient
            }
        ]
        console.log(request);
        setNewRecipient("");
        setRecipients(false);
        setPending(true);
        const response = await updateFeedbackRecipients(request);
        refreshFeedbackRecipientList();
    }

    return <React.Fragment>
        <Typography variant="h4" component="h4" className={classes.header}>Recipient e-mail settings</Typography>
        {pending && <CircularProgress className={classes.progress} />}
        {recipients && (
            <React.Fragment>
                <Typography variant="h6" component="h6" className={classes.subHeader}>Current recipient:</Typography>
                {recipients.map((recipient) => {
                    return <Grid container fullWidth>
                        <Grid item xs={12} sm={9} md={7} lg={5} xl={4}>
                            <TextField className={classes.textField} disabled fullWidth id="standard-disabled" value={recipient.email} />
                        </Grid>
                    </Grid>
                })}
            </React.Fragment>
        )}
        {error && (
            <Typography variant="p">
                Unable to connect to database, try again later
            </Typography>
            )
        }
        <Typography variant="h6" component="h6" className={classes.subHeader}>Set new recipient:</Typography>
        <Grid container fullWidth>
            <Grid item xs={12} sm={9} md={7} lg={5} xl={4}>
                <TextField className={classes.textField} onChange={_handleChange} fullWidth id="standard" value={newRecipient} />
            </Grid>
        </Grid>
        <Button variant="contained" color="primary" className={classes.submitButton} onClick={_onClick}>Update</Button>
    </React.Fragment>
}

export default EmailSettings;