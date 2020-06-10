import React from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Container from "@material-ui/core/Container";
import BuildingsTable from "../../components/Buildings/BuildingsTable";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      padding:0,
      backgroundColor: "#eceef8",
    }
}));



const BuildingsPage = () => {
    const classes = useStyles();
    
    return <Container maxWidth={false} className={classes.root}>
        <NavigationBar />
        <Container maxWidth={false}>
            <BuildingsTable />
        </Container>
    </Container>
}

export default BuildingsPage;