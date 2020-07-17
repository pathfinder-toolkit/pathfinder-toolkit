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

const CreateNewSuggestion = (props) => {
  const classes = props.style;
  const {
    getSuggestionSubjectsForAdmin,
    getSuggestionSubjectOptions,
  } = useBackend();

  const [suggestionSubjects, setSuggestionSubjects] = useState();
  const [target, setTarget] = useState();
  const [priority, setPriority] = useState();
  const [conditions, setConditions] = useState();
  const [suggestionText, setSuggestionText] = useState();
  const [loading, setLoading] = useState(true);

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

  const priorities = ["High", "Medium", "Low", "No priority"];

  const requestSubjectOptions = async () => {};

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      console.log("test fetch: ");
      try {
        const data = await getSuggestionSubjectOptions("wallMaterial");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    //fetch();
  });

  useEffect(() => {
    if (target) {
      console.log("selection changed: " + target);
    }
  }, [target]);

  const handleTargetChange = (e) => {
    setTarget(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const addSuggestion = () => {
    console.log();
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
                  onChange={handleTargetChange}
                >
                  {suggestionSubjects.map((item, index) => (
                    <MenuItem key={index} value={item.subject}>
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
          <Grid className={classes.bordered} item sm={2} md={2} lg={2}>
            <TextField label="Condition(s)" />
            <Button
              className={classes.conditionButton}
              color="primary"
              variant="outlined"
            >
              +
            </Button>
          </Grid>

          <Grid item={3}>
            <div className={classes.bordered}>
              <p>target: {target} </p>
              <p>priority: {priority}</p>
              <ConditionInfo />
            </div>
          </Grid>
        </Grid>
        <Grid className={classes.row} container spacing={2}>
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
    </React.Fragment>
  );
};

export default CreateNewSuggestion;
