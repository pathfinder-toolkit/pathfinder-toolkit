import React from "react";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    errorMessage: {
        margin: theme.spacing(1)
    }
}));

const MissingResource = (props) => {
    const classes = useStyles();

    return <Typography variant="h6" className={classes.errorMessage}>
        Unable to view {props.resourceType}.
    </Typography>
}

export default MissingResource;