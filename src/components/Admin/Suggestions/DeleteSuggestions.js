import React, { useState, useEffect, useCallback} from "react";
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

  const fetchSuggestions = useCallback(
    async (identifier) => {
      try {
        const response = await getAdminSuggestions(identifier);
        setSuggestions(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [getAdminSuggestions]
  );
  

  const deleteSuggestion = async (suggestion) => {
    try {
      await adminDeleteSuggestion(suggestion.idSuggestion);
      fetchSuggestions(selectedSubject.identifier);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubjects();
  },);

  useEffect(() => {
    if (selectedSubject) {
      fetchSuggestions(selectedSubject.identifier);
    }
  }, [selectedSubject, fetchSuggestions]);

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
