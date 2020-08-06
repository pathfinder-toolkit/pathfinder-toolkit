import React, { useState, useEffect, useCallback } from "react";
import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

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
    editSuggestion,
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

  // Value of current pending condition
  const [expression, setExpression] = useState();

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

  const getAreas = useCallback(
      async () => {
      const areas = await requestAreas();
      if (areas) {
        setAreas(areas);
      } 
    },
    [requestAreas]
  );

  const getSubjects = useCallback(
    async () => {
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
    },
    [getSuggestionSubjectsForAdmin, getAreas]
  );
  
  // Initalize
  useEffect(() => {
    getSubjects();

    // If editing existing suggestion
    if (props.suggestion) {
      setSelectedAreas(props.suggestion.areas);
      setConditions(props.suggestion.conditions);
      setPriority(props.suggestion.priority);
      setSuggestionText(props.suggestion.suggestion);
      setSubject({
        identifier: props.suggestion.identifier,
        subject: props.suggestion.subject,
        valueType: props.suggestion.valueType
      });
    }
  }, [getSubjects, props.suggestion]);



  

  const getSubjectOptions = async (identifier, areas) => {
    if (!selectedAreas) {
      return;
    }

    try {
      const response = await getSuggestionSubjectOptions(identifier, areas);
      setSubjectOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCondition = (newCondition) => {
    setConditions((conditions) => [
      ...conditions,
      { condition: newCondition, conditionedBy: subject.identifier },
    ]);
  };

  const postSuggestion = async () => {
    let areaIds = [];
    selectedAreas.forEach((item) => areaIds.push({ id: item.idArea }));

    let newSuggestion;

    if (props.suggestion) {
      // Edit existing suggestion
      newSuggestion = {
        idSuggestion: props.suggestion.idSuggestion,
        suggestion: suggestionText,
        identifier: props.suggestion.identifier,
        priority: priority,
        conditions: conditions,
        areas: areaIds,
      };

      await editSuggestion(
        newSuggestion,
        props.suggestion.idSuggestion
      );
    } else {
      newSuggestion = {
        suggestion: suggestionText,
        identifier: subject?.identifier,
        priority: priority,
        conditions: conditions,
        areas: areaIds,
      };

      await submitNewSuggestion(newSuggestion);
    }

    if (props.callback) {
      props.callback();
    }
  };

  useEffect(() => {
    if (!selectedAreas) {
      return;
    }

    if (subject) {
      if (subject.valueType === "string") {

        let areaIds = [];
        selectedAreas.forEach((item) => areaIds.push(item.idArea));

        getSubjectOptions(subject.identifier, areaIds.toString());
      } else {
        setSubjectOptions();
      }
    }
  }, [subject, selectedAreas]);

  // -- Clear conditions when subject changes. Temporary fix for usability, since this functionality does not exist in backend yet.
  // -- Remove the useEffect function below, when this functionality exists in the backend
  useEffect(() => {
    if (subject) {
      const filteredConditions = conditions.filter(condition => condition.conditionedBy === subject.identifier);
      setConditions(filteredConditions);
    }
  }, [subject]);
  // -- End of condition clear fix for usability


  const validateSubmit = () => {
    if (
        conditions.length > 0
        && priority > -1
        && suggestionText
        && selectedAreas.length > 0
      ) {
      return false;
    } else {
      return true;
    }
  }

  const selectSubject = (e) => {
    setSubject(e.target.value);
    setExpression();
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSuggestionText = (e) => {
    setSuggestionText(e.target.value);
  };

  const handleAreaChange = (e) => {
    const filtered = selectedAreas.filter(area => area.idArea !== e.target.value.idArea);
    const areaList = [
      ...filtered,
      {areaName: e.target.value.areaName, idArea: e.target.value.idArea}
    ].sort((a,b) => a.areaName > b.areaName);
    setSelectedAreas(areaList);
  }

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
              expression={{expression, setExpression}}
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
            selectedOption={expression}
          />
        </Grid>
      </Grid>

      <Button
        className={classes.submitButton}
        color="primary"
        variant="contained"
        onClick={postSuggestion}
        disabled={validateSubmit()}
      >
        {props.suggestion ? "Edit" : "Submit"}
      </Button>
    </React.Fragment>
  );
};

export default SuggestionEditor;
