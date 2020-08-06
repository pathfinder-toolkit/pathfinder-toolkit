import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import AdminPageContainer from "../../components/Admin/AdminPageContainer";
import AdminNavigationBar from "../../components/Admin/AdminNavigation/AdminNavigationBar";
import { AdminProvider } from '../../utils/AdminProvider';

import { useBackend } from "../../utils/BackendProvider";
import { useAuth0 } from "../../utils/react-auth0-spa";

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
    const { requestAdminPrivileges } = useBackend();
    const { loading } = useAuth0();
    const [ verifying, setVerifying ] = useState(true);
    const [ granted, setGranted ] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const data = await requestAdminPrivileges();
            if (data === "Verified") {
                setGranted(true);
            }
            setVerifying(false);
        }
        if (!loading) {
            setVerifying(true);
            setGranted(false);
            fetchData();
        }
    },[loading]);

    return <React.Fragment>
        <NavigationBar />
        

        <Grid container maxWidth={false} className={classes.root}>
            {verifying && (
                <CircularProgress />
            )}
            {!verifying && !granted && (
                <p>Not authorized to view this page.</p>
            )}
            {granted && (
                <AdminProvider>
                    <Grid item className={classes.sidebar} sm={2} md={2} lg={2}>
                        <AdminNavigationBar />
                    </Grid>
                    <Grid item sm={10} md={10} lg={10}>
                        <AdminPageContainer />
                    </Grid>
                </AdminProvider>
            )}
        </Grid>

    </React.Fragment>
}

export default AdminPage;