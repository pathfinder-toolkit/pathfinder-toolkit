import React, { useState, useEffect } from "react";
import NavigationBar from "../../components/Navigation/NavigationBar";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import SavedBuilding from "../../components/SavedBuilding/SavedBuilding";
import Paper from "@material-ui/core/Paper";
import { useBackend } from "../../utils/BackendProvider";
import { useAuth0 } from "../../utils/react-auth0-spa";

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

const SavedBuildingPage = (props) => {
  const classes = useStyles();
  const { getBuildingFromSlug } = useBackend();
  const [building, setBuilding] = useState(null);
  const [ error, setError ] = useState(false);

  const { loading } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      const response = await getBuildingFromSlug(props.match.params.slug);
      if (response.status === 200) {
        setBuilding(response.data);
      } else {
        setError(true);
      }
    }
    if (!loading) {
      fetchData();
    }
  }, [loading, props, getBuildingFromSlug]);

  return (
    <Container maxWidth={false} className={classes.root}>
      <NavigationBar />
      <Container maxWidth={false}>
        {building && (
          <SavedBuilding
            slug={props.match.params.slug}
            building={building}
            public={building.publicStatus}
          />
        )}
        {error && (
          <Paper className={classes.paper}>
            <MissingResource resourceType="building" />
          </Paper>
        )}
      </Container>
    </Container>
  );
};

export default SavedBuildingPage;
