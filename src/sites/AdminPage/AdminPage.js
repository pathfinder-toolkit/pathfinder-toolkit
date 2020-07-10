import React from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

import AdminPageContainer from "../../components/AdminPage/AdminPageContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        paddingBottom: theme.spacing(0.5),
        backgroundColor: "#eceef8",
    }
}));

const AdminPage = () => {
    const classes = useStyles();

    return <Container maxWidth={false} className={classes.root}>
        <NavigationBar />
        <Container maxWidth={false} >
            <AdminPageContainer />
        </Container>
    </Container>
}

export default AdminPage;