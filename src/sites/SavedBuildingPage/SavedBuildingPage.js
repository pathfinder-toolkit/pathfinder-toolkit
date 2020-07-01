import React, {useState, useEffect} from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import SavedBuilding from "../../components/SavedBuilding/SavedBuilding";
import { useBackend } from "../../utils/BackendProvider";
import { useAuth0 } from "../../utils/react-auth0-spa";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        paddingBottom: theme.spacing(0.5),
        backgroundColor: "#eceef8",
    }
}));

const SavedBuildingPage = (props) => {
    const classes = useStyles();
    const { getBuildingFromSlug } = useBackend();
    const [ building, setBuilding ] = useState(null);

    const { loading } = useAuth0();

    useEffect(() => {
        async function fetchData() {
            const data = await getBuildingFromSlug(props.match.params.slug);
            setBuilding(data);
        }
        if (!loading) {
            fetchData();
        }
    },[loading]);
    
    return <Container maxWidth={false} className={classes.root}>
        <NavigationBar />
        <Container maxWidth={false} >
            {building && (<SavedBuilding building={building} privacyMode="private" />)}
        </Container>
    </Container>
}

export default SavedBuildingPage;