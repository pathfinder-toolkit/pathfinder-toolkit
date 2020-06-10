import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import NavigationBar from "./NavigationBar";

import { useEditor } from "../../utils/EditorProvider";
import { useBackend } from "../../utils/FakeBackend";

const BuildingEditor = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: "#dddce0",
      maxHeight: "100vh",
    },
    editorContainer: {
      padding: theme.spacing(0.5),
      minHeight: "91vh",
    },
    editorComponent: {
      border: "1px solid black",
      borderRadius: "2px",
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
      marginBottom: theme.spacing(1),
      
    },
    category: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(0.5),
    },
  }));

  const styleComponent = useStylesForEditorComponent();

  const { fakeRequest, loading } = useBackend();
  useEffect(() => {
    fakeRequest();
  }, []);

  const { getStepComponent } = useEditor();

  return (
    <div className={classes.root}>
      <div className={classes.editorContainer}>
        <div className={classes.editorComponent}>
          {!loading && <Paper>{getStepComponent(styleComponent)}</Paper>}
        </div>
      </div>
      {!loading && <NavigationBar />}
    </div>
  );
};

export default BuildingEditor;
