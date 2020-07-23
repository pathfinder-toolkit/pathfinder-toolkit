import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

import { useBackend } from "../../../utils/BackendProvider";

import SuggestionList from "./SuggestionList";
import SuggestionEditor from "./SuggestionEditor";

const EditSuggestions = (props) => {
  const classes = props.style;
  const { getAdminSuggestions, getSuggestionSubjectsForAdmin } = useBackend();

  const [suggestions, setSuggestions] = useState();
  const [suggestionSubjects, setSuggestionSubjects] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedSuggestion, setSelectedSuggestion] = useState();

  const getSubjects = async () => {
    try {
      const response = await getSuggestionSubjectsForAdmin();
      if (response.status === 200) {
        console.log(response.data);
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
          <List style={{ width: "100%" }}>
            <ListItem>
              <ListItemText
                primary={
                  "Currently editing suggestion: " +
                  selectedSuggestion.idSuggestion +
                  " / " +
                  selectedSuggestion.suggestion
                }
              />
              <ListItemSecondaryAction>
                <Button onClick={() => setSelectedSuggestion()}>x</Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        )}
        {!selectedSuggestion && (
          <SuggestionList
            suggestions={suggestions}
            handleSelection={(suggestion) => setSelectedSuggestion(suggestion)}
          />
        )}
        {selectedSuggestion && (
          <div style={{ border: "1px solid #E0E0E0", borderRadius: "3px" }}>
            <SuggestionEditor
              style={classes}
              suggestion={selectedSuggestion}
              callback={() => {
                setSelectedSuggestion();
                fetchSuggestions(selectedSubject.identifier);
              }}
            />
          </div>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default EditSuggestions;
