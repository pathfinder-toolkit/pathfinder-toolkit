import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

import { useAdmin } from "../../utils/AdminProvider";

const AdminPageContainer = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: "100%",
            margin: theme.spacing(2),
            padding: theme.spacing(1)
        },
        header: {
            marginLeft:theme.spacing(1),
            marginTop:theme.spacing(2),
            marginBottom:theme.spacing(2),
        },
        subHeader: {
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(1.5),
        },
    }));
    const classes = useStyles();

    const { getComponent } = useAdmin();

    return <Paper className={classes.root}>
        <Typography variant="h4" component="h4" className={classes.header}>Admin page</Typography>
        {getComponent()}
    </Paper>
}

export default AdminPageContainer;