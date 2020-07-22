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

import SuggestionList from "./SuggestionList";
import { useBackend } from "../../../utils/BackendProvider";
import SuggestionEditor from "./SuggestionEditor";

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

  useEffect(() => {
    if (selectedSuggestion) {
      console.log("selected suggestion:");
      console.log(selectedSuggestion);
    }
  }, [selectedSuggestion]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedSuggestion();
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
        {selectedSuggestion && (
          <Grid container>
            <Grid item>
              <Typography>Editing {selectedSuggestion.suggestion}</Typography>
            </Grid>
            <Grid item>
              <Button onClick={() => setSelectedSuggestion()}>x</Button>{" "}
            </Grid>
          </Grid>
        )}
        {!selectedSuggestion && (
          <SuggestionList
            suggestions={suggestions}
            handleSelection={(suggestion) => setSelectedSuggestion(suggestion)}
          />
        )}
        {selectedSuggestion && (
          <SuggestionEditor style={classes} suggestion={selectedSuggestion} />
        )}
      </Grid>
    </React.Fragment>
  );
};

export default EditSuggestions;
