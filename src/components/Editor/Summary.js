import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Grid,
  Button,
  Fade,
  Paper,
} from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";
import { useEditor } from "../../utils/EditorProvider";
import Tip from "./Tips";
import Tips from "./Tips";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  categoryGrid: {
    flexGrow: 1,
  },
  category: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
}));

const Summary = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <Fade in={loading}>
      <div className={classes.root}>
        <Typography className={classes.header} variant="h5">
          Summary
        </Typography>
        <Grid container className={classes.categoryGrid} spacing={8}>
          <Grid item sm={4} md={4} lg={4}>
            <Paper className={classes.category}>
              <Typography variant="h6">General</Typography>
              <Typography variant="subtitle1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                cursus tortor metus, egestas bibendum velit tempor eu. Mauris
                diam leo, vehicula ac dui ut, condimentum pellentesque urna.
                Duis maximus magna nibh, in varius libero fringilla vel.
                Pellentesque nunc urna, dapibus ac pulvinar sed, rutrum ac
                ligula.
              </Typography>
            </Paper>
          </Grid>
          <Grid item sm={8} md={8} lg={8}>
            <Paper className={classes.category}>
              <Typography variant="h5">Recommendations</Typography>
              <Typography gutterBottom variant="subtitle1">
                Changes that will improve energy effiency.
              </Typography>
              <Tips />
            </Paper>
          </Grid>
          <Grid item sm={10} md={10} lg={10}>
            <Paper className={classes.category}>
              <Typography variant="h6">General</Typography>
              <Typography variant="subtitle1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                cursus tortor metus, egestas bibendum velit tempor eu. Mauris
                diam leo, vehicula ac dui ut, condimentum pellentesque urna.
                Duis maximus magna nibh, in varius libero fringilla vel.
                Pellentesque nunc urna, dapibus ac pulvinar sed, rutrum ac
                ligula.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default Summary;
