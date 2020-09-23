import React from "react";
import NavigationBar from "../../components/Navigation/NavigationBar";
import Container from "@material-ui/core/Container";
import About from "../../components/About/About";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    //backgroundColor: "#eceef8",
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.root}>
      <NavigationBar />
      <Container maxWidth={false}>
        <About />
      </Container>
    </Container>
  );
};

export default AboutPage;
