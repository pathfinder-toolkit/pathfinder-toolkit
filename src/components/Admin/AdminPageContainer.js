import React from "react";
import Paper from "@material-ui/core/Paper";
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
        progress: {
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2)
        },
        submitButton: {
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
        }
    }));
    const styleClasses = useStyles();

    const { getComponent } = useAdmin();

    return <Paper className={styleClasses.root}>
        {getComponent(styleClasses)}
    </Paper>
}

export default AdminPageContainer;