import React from "react";
import NavigationBar from "../../components/Navigation/NavigationBar";
import Container from "@material-ui/core/Container";
import DemoBuildings from "../../components/Buildings/DemoBuildings";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    backgroundColor: "#eceef8",
  },
}));

const DemoPage = () => {
  const classes = useStyles();

  const demoBuildings = [
    {
      creationDate: "2021-08-10T07:37:52.135Z",
      image: "pathfinder_userimages/ihibbp4kcnuwwmmzbelm",
      name: "Demo building",
      slug: "b",
    },
    {
      creationDate: "2022-08-10T07:37:52.135Z",
      image: "pathfinder_userimages/ihibbp4kcnuwwmmzbelm",
      name: "Demo building 2",
      slug: "b",
    },
  ];

  return (
    <Container maxWidth={false} className={classes.root}>
      <NavigationBar />
      <Container maxWidth={false}>
        <DemoBuildings demoBuildings={demoBuildings} />
      </Container>
    </Container>
  );
};

export default DemoPage;
