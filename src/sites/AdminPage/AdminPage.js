import React, { useEffect } from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

import AdminPageContainer from "../../components/Admin/AdminPageContainer";
import AdminNavigationBar from "../../components/Admin/AdminNavigation/AdminNavigationBar";
import { AdminProvider } from '../../utils/AdminProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        paddingBottom: theme.spacing(0.5),
        backgroundColor: "#eceef8",
        minHeight: "90vh"
    }
}));

const AdminPage = () => {
    const classes = useStyles();

    return  <React.Fragment>
        <NavigationBar />
        <Grid container maxWidth={false} className={classes.root}>
        <AdminProvider>
            <Grid item className={classes.sidebar} sm={2} md={2} lg={2}>
                <AdminNavigationBar />
            </Grid>
            <Grid item sm={10} md={10} lg={10}>
                <AdminPageContainer />
            </Grid>
        </AdminProvider>
    </Grid>
    </React.Fragment>
}

export default AdminPage;