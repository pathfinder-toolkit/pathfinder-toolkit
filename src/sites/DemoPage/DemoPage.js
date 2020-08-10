import React from "react";
import NavigationBar from "../../components/Navigation/NavigationBar";
import Container from "@material-ui/core/Container";
import DemoBuildings from "../../components/Demo/DemoBuildings";
import { makeStyles } from "@material-ui/core/styles";

import buildings from "../../json/demoBuildings.json"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    backgroundColor: "#eceef8",
  },
}));

const DemoPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.root}>
      <NavigationBar />
      <Container maxWidth={false}>
        <DemoBuildings demoBuildings={buildings} />
      </Container>
    </Container>
  );
};

export default DemoPage;
