import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import CommentCreationForm from "./CommentCreationForm";

const useStyles = makeStyles((theme) => ({
  createCommentButton: {
    marginBottom: theme.spacing(2),
  },
  root: {
      marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(0),
  },
  headerText: {
    fontSizeAdjust: 0.4,
  },
  textArea: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0),
    paddingRight: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  radioForm: {
    marginLeft: theme.spacing(0),
    paddingRight: theme.spacing(4),
    display: "block",
  },
  switch: {
    marginLeft: theme.spacing(0),
  },
  switchText: {
    display: "inline-block",
    marginLeft: theme.spacing(0),
  },
  explanationText: {
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
  submitCommentButton: {
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(2),
    display: "block",
  },
}));

const CommentCreation = () => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);

  const _handleToggle = () => {
    setShowForm(showForm ? false : true);
  };

  return (
    <React.Fragment>
      <CommentCreationForm classes={classes} onClose={_handleToggle} />
    </React.Fragment>
  );
};

export default CommentCreation;
