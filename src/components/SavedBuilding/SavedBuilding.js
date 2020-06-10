import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import ActionToolbar from "./ActionToolbar.js";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    actions: {
        margin: theme.spacing(2),
        backgroundColor: "#eceef8",
        display:"flex",
        flexDirection:"column",
    },
    actionsText: {
        margin: "auto",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    actionsButton: {
        maxWidth: "50%",
        margin: "auto",
        marginBottom: theme.spacing(2),
    }
}));

const SavedBuilding = (props) => {
    const classes = useStyles();

    return <Paper className={classes.root}>
        <Grid container className={classes.root}>
            <Grid item sm={9}>
                <Typography>
                    
                </Typography>
            </Grid>

            <Grid item sm={3}>
                <ActionToolbar privacyMode={props.privacyMode} />
            </Grid>

        </Grid>
    </Paper>
}

export default SavedBuilding;