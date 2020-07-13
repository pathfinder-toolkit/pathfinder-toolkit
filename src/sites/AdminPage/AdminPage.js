import React from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

import AdminPageContainer from "../../components/AdminPage/AdminPageContainer";
import AdminNavigationBar from "../../components/AdminPage/AdminNavigationBar/AdminNavigation";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        paddingBottom: theme.spacing(0.5),
        backgroundColor: "#eceef8",
    }
}));

const AdminPage = () => {
    const classes = useStyles();

    return  <Grid container maxWidth={false} className={classes.root}>
        <NavigationBar />
        <Grid item className={classes.sidebar} sm={2} md={2} lg={2}>
            <AdminNavigationBar />
        </Grid>
        <Grid item sm={10} md={10} lg={10}>
            <AdminPageContainer />
        </Grid>
    </Grid>
}

export default AdminPage;