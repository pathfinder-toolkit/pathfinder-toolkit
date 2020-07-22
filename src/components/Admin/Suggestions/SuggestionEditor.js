import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";

import { useBackend } from "../../../utils/BackendProvider";
import EvaluateCondition from "./EvaluateCondition";
import PreviewSuggestion from "./PreviewSuggestion";

const SuggestionEditor = (props) => {
  const classes = props.style;
  const {
    getSuggestionSubjectsForAdmin,
    getSuggestionSubjectOptions,
    requestAreas,
    submitNewSuggestion,
  } = useBackend();

  const [areas, setAreas] = useState();
  const [selectedAreas, setSelectedAreas] = useState([]);

  const [suggestionSubjects, setSuggestionSubjects] = useState();
  const [subject, setSubject] = useState();
  const [subjectOptions, setSubjectOptions] = useState();
  const [priority, setPriority] = useState();

  const [conditions, setConditions] = useState([]);

  const [suggestionText, setSuggestionText] = useState();
  const [loading, setLoading] = useState(true);

  const priorities = [
    {
      text: "High",
      value: 100,
      color: "rgb(253, 236, 234)",
    },
    {
      text: "Medium",
      value: 49,
      color: "rgb(255, 244, 229)",
    },
    {
      text: "Low",
      value: 19,
      color: "rgb(232, 244, 253)",
    },
    {
      text: "No priority",
      value: 0,
      color: "rgb(237, 247, 237)",
    },
  ];

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
    const areas = await requestAreas();
    if (areas) {
      setAreas(areas);
    }
  };

  const getSubjectOptions = async (identifier, areas) => {
    if (!selectedAreas) {
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

  const addCondition = (newCondition) => {
    console.log("adding new condition: ");
    console.log(newCondition);
    setConditions((conditions) => [
      ...conditions,
      { condition: newCondition, conditionedBy: subject.identifier },
    ]);
  };

  const postSuggestion = async () => {
    let areaIds = [];
    selectedAreas.forEach((item) => areaIds.push({ id: item.idArea }));

    const newSuggestion = {
      suggestion: suggestionText,
      identifier: subject.identifier,
      priority: priority,
      conditions: conditions,
      areas: areaIds,
    };

    console.log(newSuggestion);
    const response = await submitNewSuggestion(newSuggestion);
    console.log(response);
  };

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    if (!selectedAreas) {
      console.log("no area selected");
      return;
    }

    if (subject) {
      console.log("subject changed: " + subject.identifier);
      if (subject.valueType === "string") {
        console.log("valueType is string, get options");

        let areaIds = [];
        selectedAreas.forEach((item) => areaIds.push(item.idArea));

        getSubjectOptions(subject.identifier, areaIds.toString());
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

  const handleSuggestionText = (e) => {
    setSuggestionText(e.target.value);
  };

  const handleAreaChange = (e) => {
    setSelectedAreas((selectedAreas) => [
      ...selectedAreas,
      { areaName: e.target.value.areaName, idArea: e.target.value.idArea },
    ]);
  };

  const removeSelectedArea = (area) => {
    setSelectedAreas(selectedAreas.filter((item) => item !== area));
  };

  const removeSelectedCondition = (condition) => {
    setConditions(conditions.filter((item) => item !== condition));
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid container sm={8} className={classes.suggestionRoot}>
          <Grid
            className={classes.row}
            container
            alignItems="center"
            spacing={1}
          >
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
            <Grid item sm={2} md={2} lg={2}>
              {!loading && (
                <TextField
                  variant="outlined"
                  className={classes.targetSelect}
                  label="Subject"
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
                  <MenuItem
                    style={{ backgroundColor: item.color }}
                    key={index}
                    value={item.value}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item={3}>
              <div className={classes.bordered}>{/*<ConditionInfo />*/}</div>
            </Grid>
          </Grid>
          <Grid className={classes.row} container spacing={1}>
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
                onChange={handleSuggestionText}
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <PreviewSuggestion
            classes={classes}
            subject={subject}
            suggestionText={suggestionText}
            areas={selectedAreas}
            priority={priority}
            conditions={conditions}
            handleArea={(area) => removeSelectedArea(area)}
            handleCondition={(condition) => removeSelectedCondition(condition)}
          />
        </Grid>
      </Grid>

      <Button
        className={classes.submitButton}
        color="primary"
        variant="contained"
        onClick={postSuggestion}
        disabled={conditions.length < 1}
      >
        submit
      </Button>
    </React.Fragment>
  );
};

export default SuggestionEditor;
