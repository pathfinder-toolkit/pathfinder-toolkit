import React from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Container from "@material-ui/core/Container";
import BuildingsTable from "../../components/Buildings/BuildingsTable";

const BuildingsPage = () => {
    return <React.Fragment>
        <NavigationBar />
        <Container maxWidth="lg">
            <BuildingsTable />
        </Container>
    </React.Fragment>
}

export default BuildingsPage;