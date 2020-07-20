import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";

import { useBackend } from "../../../utils/BackendProvider";
import ConditionInfo from "./ConditionInfo";
import EvaluateCondition from "./EvaluateCondition";

const CreateNewSuggestion = (props) => {
  const classes = props.style;
  const {
    getSuggestionSubjectsForAdmin,
    getSuggestionSubjectOptions,
    requestAreas,
  } = useBackend();

  const [areas, setAreas] = useState();
  const [selectedArea, setSelectedArea] = useState();

  const [suggestionSubjects, setSuggestionSubjects] = useState();
  const [subject, setSubject] = useState();
  const [subjectOptions, setSubjectOptions] = useState();
  const [priority, setPriority] = useState();

  const [conditions, setConditions] = useState([
    { condition: "test condition", conditionedBy: "string" },
  ]);

  const [suggestionText, setSuggestionText] = useState();
  const [loading, setLoading] = useState(true);

  const getSubjects = async () => {
    setLoading(true);
    try {
      const response = await getSuggestionSubjectsForAdmin();
      if (response.status === 200) {
        console.log(response.data);
        setSuggestionSubjects(response.data);
        getAreas();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAreas = async () => {
    console.log();

    const areas = await requestAreas();
    console.log(areas);
    if (areas) {
      setAreas(areas);
    }
  };

  const getSubjectOptions = async (identifier, areas) => {
    if (!selectedArea) {
      console.log("no area selected");
      return;
    }

    console.log("fetching options about: " + identifier);
    try {
      const response = await getSuggestionSubjectOptions(identifier, areas);
      setSubjectOptions(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (areas) {
      console.log(areas);
    }
  }, [areas]);

  useEffect(() => {
    getSubjects();
  }, []);

  const priorities = ["High", "Medium", "Low", "No priority"];

  useEffect(() => {
    if (!selectedArea) {
      console.log("no area selected");
      return;
    }

    if (subject) {
      console.log("subject changed: " + subject.identifier);
      if (subject.valueType === "string") {
        console.log("valueType is string, get options");
        getSubjectOptions(subject.identifier, selectedArea.idArea);
      } else {
        setSubjectOptions();
      }
    }
  }, [subject]);

  const selectSubject = (e) => {
    setSubject(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const addCondition = (newCondition) => {
    console.log("adding new condition: ");
    console.log(newCondition);
    setConditions((conditions) => [...conditions, newCondition]);
  };

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Typography variant="h4" component="h4" className={classes.header}>
        Create a new suggestion
      </Typography>
      <Grid container className={classes.suggestionRoot}>
        <Grid className={classes.row} container alignItems="center" spacing={2}>
          <Grid item sm={2} md={2} lg={2}>
            {!loading && (
              <React.Fragment>
                <TextField
                  variant="outlined"
                  className={classes.targetSelect}
                  label="Target"
                  select
                  fullWidth
                  onChange={selectSubject}
                >
                  {suggestionSubjects.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item.subject}
                    </MenuItem>
                  ))}
                </TextField>
              </React.Fragment>
            )}
          </Grid>
          <Grid item sm={2} md={2} lg={2}>
            <TextField
              variant="outlined"
              label="Priority"
              select
              fullWidth
              onChange={handlePriorityChange}
            >
              {priorities.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={2} md={2} lg={2}>
            <TextField
              variant="outlined"
              label="Areas"
              select
              fullWidth
              onChange={handleAreaChange}
            >
              {areas?.map((area, index) => (
                <MenuItem key={index} value={area}>
                  {area.areaName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item={3}>
            <div className={classes.bordered}>{/*<ConditionInfo />*/}</div>
          </Grid>
        </Grid>
        <Grid className={classes.row} container spacing={2}>
          <EvaluateCondition
            classes={classes}
            valueType={subject?.valueType}
            options={subjectOptions}
            handler={(newCondition) => addCondition(newCondition)}
          />
          <Grid item sm={6} md={6} lg={6}>
            <TextField
              fullWidth
              variant="outlined"
              rows={4}
              multiline
              label="Suggestion text"
              value={suggestionText}
            ></TextField>
          </Grid>
        </Grid>
      </Grid>
      <Button
        className={classes.submitButton}
        color="primary"
        variant="contained"
      >
        add
      </Button>
      <p>subject: {subject?.subject} </p>
      <p>type: {subject?.identifier}</p>
      <p>selected area: {selectedArea?.areaName}</p>
      <p>priority: {priority}</p>
      <p className={classes.bordered}>
        conditions:
        {conditions?.map((item, index) => (
          <p>
            {item.condition} | {item.conditionedBy}
          </p>
        ))}
      </p>
    </React.Fragment>
  );
};

export default CreateNewSuggestion;
