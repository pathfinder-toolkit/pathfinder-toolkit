import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import NavigationBar from "./NavigationBar";

import { useEditor } from "../../utils/EditorProvider";

const BuildingEditor = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: "#eceef8",
      maxHeight: "100vh",
    },
    editorContainer: {
      padding: theme.spacing(0.5),
      minHeight: "91vh",
    },
    editorComponent: {
      border: "1px solid black",
      borderRadius: "2px",
      height: "90vh",
      maxHeight: "92vh",
    },
  }));
  const classes = useStyles();

  const useStylesForEditorComponent = makeStyles((theme) => ({
    root: {
      padding: "1rem",
    },
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    header: {
      borderBottom: "1px solid #E0E0E0",
      marginBottom: theme.spacing(1),
    },
    category: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(0.5),
      border: "0px solid black", //debug
    },
    row: {
      borderBottom: "1px solid #E0E0E0",
      marginBottom: theme.spacing(1),
    },
    formComponent: {
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(4),
    },
    slider: {
      marginTop: theme.spacing(5.5),
    },
    formButton: {
      margin: theme.spacing(1),
    },
    formBorder: {
      border: "1px solid #E0E0E0",
      borderRadius: "4px",
    },
    clearButton: {
      marginBottom: theme.spacing(-5.5),
    },
    controls: {
      display: "flex",
    },
    valueText: {
      border: "2px solid #E0E0E0",
      borderRadius: "4px",
      padding: theme.spacing(2),
      width: "50px",
      height: "42px",
      marginTop: theme.spacing(1),
    },
    suggestionContainer: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(0),
      borderLeft: "2px solid #E0E0E0", //debug
    },
  }));

  const styleComponent = useStylesForEditorComponent();
  const { getStepComponent } = useEditor();

  return (
    <div className={classes.root}>
      <div className={classes.editorContainer}>
        <div className={classes.editorComponent}>
          <Paper>{getStepComponent(styleComponent)}</Paper>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default BuildingEditor;
