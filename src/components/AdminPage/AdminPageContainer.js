import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

const AdminPageContainer = () => {
    const classes = useStyles();

    return <Paper className={classes.root}>
        <div>Testi</div>
    </Paper>
}

export default AdminPageContainer;