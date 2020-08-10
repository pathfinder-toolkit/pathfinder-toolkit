import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    border: "0px solid #E0E0E0",
    borderRadius: "4px",
    marginRight: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: "#FAF9C7",
  },
  header: {},
}));

const AdminInstructions = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Typography className={classes.header} variant="h5">
        Instructions
      </Typography>
      <Grid item sm={10}>
        <Typography>
          <b>Suggestions</b>
        </Typography>
        <Typography>
          You can create new suggestions, edit and delete existing suggestions.
        </Typography>
      </Grid>
      <Grid item sm={10}>
        <Typography>
          <b>User experiences / Comments</b>
        </Typography>
        <Typography>
          You can review user reports.
          <br />- Accepting the report will delete the reported user experience.
          <br />- Dismissing the report will do nothing to the user experience.
        </Typography>
      </Grid>
      <Grid item sm={10}>
        <Typography>
          <b>Editor options</b>
        </Typography>
        <Typography>
          You can update editor options (Building materials, heating types,
          etc.) regionally or for all regions at the same time.
        </Typography>
      </Grid>
      <Grid item sm={10}>
        <Typography>
          <b>Feedback</b>
        </Typography>
        <Typography>
          You can change the email address where the feedback provided by users
          will be sent.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AdminInstructions;
