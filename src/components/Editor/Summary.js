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
} from "@material-ui/core";

import { useBackend } from "../../utils/FakeBackend";

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
        <Typography variant="h5" aling="center">
          Summary
        </Typography>
      </div>
    </Fade>
  );
};

export default Summary;
