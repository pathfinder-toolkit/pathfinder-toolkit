import React from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import SavedBuilding from "../../components/SavedBuilding/SavedBuilding";

const useStyles = makeStyles((theme) => ({
    root: {
        padding:0,
        backgroundColor: "#eceef8",
    }
}));

const SavedBuildingPage = () => {
    const classes = useStyles();

    return <Container maxWidth={false} className={classes.root}>
        <NavigationBar />
        <Container maxWidth={false} >
            <SavedBuilding privacyMode="private" />
        </Container>
    </Container>
}

export default SavedBuildingPage;