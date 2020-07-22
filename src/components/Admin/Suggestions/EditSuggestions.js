import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  List,
  IconButton,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

import { useBackend } from "../../../utils/BackendProvider";

const EditSuggestions = (props) => {
  const classes = props.style;
  const [suggestions, setSuggestions] = useState();
  const [suggestionSubjects, setSuggestionSubjects] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedSuggestion, setSelectedSuggestion] = useState();
  const [loading, setLoading] = useState(true);
  const { getAdminSuggestions, getSuggestionSubjectsForAdmin } = useBackend();

  const getSubjects = async () => {
    setLoading(true);
    try {
      const response = await getSuggestionSubjectsForAdmin();
      if (response.status === 200) {
        console.log(response.data);
        setSuggestionSubjects(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuggestions = async (identifier) => {
    console.log("fetching suggestions about :" + identifier);
    setLoading(true);
    try {
      const response = await getAdminSuggestions(identifier);
      console.log(response.data);
      setSuggestions(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchSuggestions(selectedSubject.identifier);
    }
  }, [selectedSubject]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" component="h4" className={classes.header}>
        Edit existing suggestions
      </Typography>
      <Grid container>
        <TextField
          variant="outlined"
          className={classes.targetSelect}
          label="Subject"
          select
          fullWidth
          value={selectedSubject}
          onChange={handleSubjectChange}
        >
          {suggestionSubjects?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item.subject}
            </MenuItem>
          ))}
        </TextField>
        <Typography>Suggestions</Typography>
        <List>
          {suggestions?.length === 0 && (
            <ListItem>
              <ListItemText primary={"No suggestions."} />
            </ListItem>
          )}
          {suggestions?.map((suggestion, index) => (
            <ListItem key={index} value={suggestion}>
              <ListItemText primary={JSON.stringify(suggestion)} />
              <ListItemSecondaryAction>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    </React.Fragment>
  );
};

export default EditSuggestions;
