import React, { useState, useEffect } from "react";
import NavigationBar from "../../components/Navigation/NavigationBar";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useBackend } from "../../utils/BackendProvider";
import Paper from "@material-ui/core/Paper";
import BuildingViewer from "../../components/BuildingViewer/BuildingViewer";

import MissingResource from "../../components/SavedBuilding/MissingResource";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        paddingBottom: theme.spacing(0.5),
        backgroundColor: "#eceef8",
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    }
}));

const PublicBuildingPage = (props) => {
    const classes = useStyles();
    const { getPublicBuildingFromSlug } = useBackend();
    const [building, setBuilding] = useState(null);

    const [status, setStatus] = useState({
        pending: false,
        resolved: false,
        success: false
    });

    const fetchData = async () => {
        setStatus((prev) => {
            return {
                ...prev,
                pending: true
            }
        })
        const response = await getPublicBuildingFromSlug(props.match.params.slug);
        const newStatus = {
            pending: false,
            resolved: true
        };
        if (response.status === 200) {
            setBuilding(response.data);
            newStatus.success = true;
        }
        setStatus((prev) => {
            return {
                ...prev,
                ...newStatus
            }
        });
    }

    useEffect(() => {
        fetchData();
    }, [props, fetchData]);

    return (
        <Container maxWidth={false} className={classes.root}>
            <NavigationBar />
            <Container maxWidth={false}>
                {status.success && (
                    <Paper className={classes.paper}>
                        <BuildingViewer
                            building={building}
                        />
                    </Paper>
                )}
                {!status.success && status.resolved && (
                    <Paper className={classes.paper}>
                        <MissingResource resourceType="building" />
                    </Paper>
                )}
            </Container>
        </Container>
    );
};

export default PublicBuildingPage;
