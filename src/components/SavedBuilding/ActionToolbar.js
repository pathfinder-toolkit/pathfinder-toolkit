import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
        maxWidth: "75%",
        margin: "auto",
        marginBottom: theme.spacing(2),
    }
}));

const ActionToolbar = (props) => {
    const classes = useStyles();

    return <Paper className ={classes.actions}>
        <Typography className={classes.actionsText}>
            This page is currently {props.privacyMode}
        </Typography>
        <Button variant="contained" color="primary" className={classes.actionsButton}>
            <Typography className={classes.text}>
                Make {props.privacyMode === 'private' ? 'public' : 'private'}
            </Typography>
        </Button>
        <Button variant="contained" color="primary" className={classes.actionsButton}>
            <Typography className={classes.text}>
                Edit Building
            </Typography>
        </Button>
    </Paper>
}

export default ActionToolbar;