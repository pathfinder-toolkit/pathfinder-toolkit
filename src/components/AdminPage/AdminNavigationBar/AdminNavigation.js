import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';

const AdminNavigationBar = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: theme.spacing(2),
            padding: theme.spacing(1)
        },
        listItem: {
            backgroundColor: "#FFFFFF"
        }
    }));

    const classes = useStyles();



    return <Paper className={classes.root}>
        <List>
            <ListItem button className={classes.listItem}>
            <ListItemText>First</ListItemText>

            </ListItem>
        </List>
    </Paper>
}

export default AdminNavigationBar;