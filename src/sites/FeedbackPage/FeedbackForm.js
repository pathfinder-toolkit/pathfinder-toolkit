import React, { useState } from "react";
import {
  Typography,
  Button,
  Paper,
  TextField,
  Box,
  CircularProgress
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";

import ReCAPTCHA from "react-google-recaptcha";

import { useBackend } from "../../utils/BackendProvider";

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
    margin: theme.spacing(1),
    backgroundColor: "#ffffff"
  },
  actionsButton: {
    width: "50%",
    alignSelf: "center",
    marginBottom: theme.spacing(2),
  },
  progress: {
    margin: theme.spacing(2),
  },
  alert: {
    margin: theme.spacing(2),
  }
}));

const FeedbackForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [recaptcha, setRecaptcha] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const classes = useStyles();

  const {
    sendFeedbackWithRecaptcha
  } = useBackend();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const onChange = (value) => {
    setRecaptcha(value);
  }

  const onExpired = () => {
    setRecaptcha(false);
  }

  const resetForRequest = () => {
    setSuccess(false);
    setShow(false);
    setTitle("");
    setText("");
    setRecaptcha(false);
  }

  const onSubmit = async () => {
    resetForRequest();
    const feedback= {
      title: title,
      text: text,
      recaptcha: recaptcha
    };
    setPending(true);
    const result = await sendFeedbackWithRecaptcha(feedback);
    setPending(false);
    if (result) {
      setMessage(result.data)
      if (result.status === 201) {
        setSuccess(true);
      }
    }
    setShow(true);
  }

  return (
    <Paper className={classes.actions}>
      <Typography variant="h5"className={classes.actionsText}>Feedback</Typography>
      <TextField
        className={classes.feedbackField}
        id="feedback-title"
        label="Title"
        value={title}
        variant="outlined"
        onChange={handleTitleChange}
      />
      <TextField
        className={classes.feedbackField}
        id="feedback-content"
        multiline
        rows={4}
        value={text}
        variant="outlined"
        onChange={handleTextChange}
      />
      <Box alignSelf="center" m={1}>
        <ReCAPTCHA
        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
        onChange={onChange}
        onExpired={onExpired}
        />
      </Box>
      <Button
        className={classes.actionsButton}
        variant="contained"
        color="primary"
        disabled={!(text && title && recaptcha)}
        onClick={onSubmit}
      >
        Submit
      </Button>
      <Box alignSelf="center" m={0}>
      {pending && (
        <CircularProgress className={classes.progress} />
      )}
      {show && (
        <Alert 
        severity={success ? "success" : "error"}
        onClose={() => {setShow(false)}}
        className={classes.alert}
        >
          {message}
        </Alert>
      )}
      </Box>
    </Paper>
  );
};

export default FeedbackForm;
