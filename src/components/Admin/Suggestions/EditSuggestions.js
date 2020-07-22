import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";

import { useBackend } from "../../../utils/BackendProvider";

const EditSuggestions = (props) => {
  const [suggestions, setSuggestions] = useState();
  const [selectedSuggestion, setSelectedSuggestion] = useState();
  const [loading, setLoading] = useState(true);
  const { getAdminSuggestions } = useBackend();

  const fetchSuggestions = async () => {
    console.log("fetching suggestions:");
    setLoading(true);
    try {
      const data = await getAdminSuggestions();
      setSuggestions(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  const classes = props.style;

  return (
    <React.Fragment>
      <Typography variant="h4" component="h4" className={classes.header}>
        Edit existing suggestions
      </Typography>
      <Grid container>
        <TextField variant="outlined" label="Options"></TextField>
      </Grid>
    </React.Fragment>
  );
};

export default EditSuggestions;
