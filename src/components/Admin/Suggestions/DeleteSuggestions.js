import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  IconButton,
} from "@material-ui/core/";

import DeleteIcon from "@material-ui/icons/Delete";

import { useBackend } from "../../../utils/BackendProvider";

import SuggestionList from "./SuggestionList";

const DeleteSuggestions = (props) => {
  const classes = props.style;
  const {
    adminDeleteSuggestion,
    getAdminSuggestions,
    getSuggestionSubjectsForAdmin,
  } = useBackend();

  const [suggestions, setSuggestions] = useState();
  const [suggestionSubjects, setSuggestionSubjects] = useState();
  const [selectedSubject, setSelectedSubject] = useState();

  const getSubjects = async () => {
    try {
      const response = await getSuggestionSubjectsForAdmin();
      if (response.status === 200) {
        setSuggestionSubjects(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuggestions = async (identifier) => {
    console.log("fetching suggestions about :" + identifier);
    try {
      const response = await getAdminSuggestions(identifier);
      console.log(response.data);
      setSuggestions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSuggestion = async (suggestion) => {
    console.log("deleting suggestion: ");
    console.log(suggestion);
    try {
      const response = await adminDeleteSuggestion(suggestion.idSuggestion);
      console.log(response.data);
      fetchSuggestions(selectedSubject.identifier);
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
        Delete suggestions
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

        <SuggestionList
          suggestions={suggestions}
          handleAction={(suggestion) => deleteSuggestion(suggestion)}
          secondaryAction={
            <IconButton>
              <DeleteIcon color="primary" />
            </IconButton>
          }
        />
      </Grid>
    </React.Fragment>
  );
};

export default DeleteSuggestions;
