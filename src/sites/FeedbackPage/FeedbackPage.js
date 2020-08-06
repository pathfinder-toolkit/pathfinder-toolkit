import React from "react";
import NavigationBar from "../../components/Navigation/NavigationBar";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import FeedbackForm from "./FeedbackForm";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));

const FeedbackPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.root}>
      <NavigationBar />
      <Container>
        <FeedbackForm />
      </Container>
    </Container>
  );
};

export default FeedbackPage;
