import React from "react";
import NavigationBar from "../../components/Navigation/NavigationBar";
import Container from "@material-ui/core/Container";
import CoDesignInfo from "../../components/Co-Design/CoDesignInfo";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    //backgroundColor: "#eceef8",
  },
}));

const DemoPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.root}>
      <NavigationBar />
      <Container maxWidth={false}>
        <CoDesignInfo />
      </Container>
    </Container>
  );
};

export default DemoPage;
