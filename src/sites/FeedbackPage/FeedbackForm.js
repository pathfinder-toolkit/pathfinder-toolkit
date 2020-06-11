import React, { useState } from "react";
import {
  Typography,
  Button,
  Paper,
  TextField,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  actions: {
    margin: theme.spacing(1),
    backgroundColor: "#eceef8",
    display: "flex",
    flexDirection: "column",
  },
  actionsText: {
    margin: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  feedbackTitle: {},
  feedbackField: {
    padding: theme.spacing(1),
  },
  actionsButton: {
    width: "50%",
    alignSelf: "center",
    marginBottom: theme.spacing(2),
  },
}));

const FeedbackForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const classes = useStyles();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Paper className={classes.actions}>
      <Typography variant="h5"className={classes.actionsText}>Feedback</Typography>
      <TextField
        className={classes.feedbackField}
        id="feedback-title"
        label="Title"
        defaultValue=""
        variant="outlined"
        onChange={handleTitleChange}
      />
      <TextField
        className={classes.feedbackField}
        id="feedback-content"
        multiline
        rows={4}
        defaultValue=""
        variant="outlined"
        onChange={handleTextChange}
      />
      <Button
        className={classes.actionsButton}
        variant="contained"
        color="primary"
        disabled={(text && title) ? false : true}
      >
        Submit
      </Button>
    </Paper>
  );
};

export default FeedbackForm;
