import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import history from "../../utils/history";

const useStyles = makeStyles((theme) => ({
  infoBox: {
    marginTop: "4em",
    backgroundColor: "#eceef8",
    padding: "2em",
    borderRadius: "4px",
  },
  infoHeader: {
    marginBottom: "20px",
  },
  infoButton: {
    marginTop: "20px",
  },
}));

const CoDesignInfo = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item md={5} className={classes.infoBox}>
        <Typography align="center" variant="h2" className={classes.infoHeader}>
          Co-design
        </Typography>
        <Typography>
          Co-design is the act of creating with stakeholders (business or
          customers) specifically within the design development process to
          ensure the results meet their needs and are usable. (Co-design may
          also be called participatory design- a term which is used more often
          within the design community.)
        </Typography>
        <Grid item align="center">
          <Button
            className={classes.infoButton}
            color="primary"
            variant="contained"
            onClick={() => history.push("/")}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CoDesignInfo;
