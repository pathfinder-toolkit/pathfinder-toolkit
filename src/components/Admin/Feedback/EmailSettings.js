import React from "react";
import Typography from "@material-ui/core/Typography";

const EmailSettings = (props) => {
    const classes = props.style;

    return <Typography variant="h4" component="h4" className={classes.header}>Recipient e-mail settings</Typography>
}

export default EmailSettings;