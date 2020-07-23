import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useAdmin } from "../../utils/AdminProvider";

const AdminPageContainer = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "100%",
      margin: theme.spacing(2),
      padding: theme.spacing(1),
    },
    header: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    subHeader: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1.5),
    },
    progress: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    submitButton: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    suggestionRoot: {
      marginLeft: theme.spacing(1),
    },
    row: {
      marginBottom: theme.spacing(1),  
    },
    targetSelect: {
      marginBottom: theme.spacing(0),
    },
    conditionButton: {
      marginTop: theme.spacing(1),
    },
    bordered: {
      border: "1px solid #C4C4C4",
      borderRadius: "3px",
      margin: theme.spacing(1),
    },
    listItem: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1)
    }
  }));
  const styleClasses = useStyles();

  const { getComponent } = useAdmin();

  return (
    <Paper className={styleClasses.root}>{getComponent(styleClasses)}</Paper>
  );
};

export default AdminPageContainer;
