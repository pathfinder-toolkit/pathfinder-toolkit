import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import ActionToolbar from "./ActionToolbar.js";
import BuildingViewer from "../BuildingViewer/BuildingViewer.js";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

const SavedBuilding = (props) => {
    const classes = useStyles();

    return <Paper className={classes.root}>
        <Grid container className={classes.root}>
            <Grid item sm={10}>
                <BuildingViewer building={props.building} />
            </Grid>

            <Grid item sm={2}>


                <ActionToolbar public={props.public} slug={props.building.slug} />

            </Grid>

        </Grid>
    </Paper>
}

export default SavedBuilding;