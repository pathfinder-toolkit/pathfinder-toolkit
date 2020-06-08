import React, { useEffect } from "react";
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
  }));
  const classes = useStyles();

  const { fakeRequest, loading } = useBackend();
  useEffect(() => {
    fakeRequest();
  }, []);

  const { getStepComponent } = useEditor();

  return (
    <div className={classes.root}>
      <div className={classes.editorContainer}>
        <div className={classes.editorComponent}>
          {!loading && <Paper>{getStepComponent()}</Paper>}
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default BuildingEditor;
