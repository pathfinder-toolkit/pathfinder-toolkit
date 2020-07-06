import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import EditorNavigationBar from "./EditorNavigationBar";
import SuggestionContainer from "./Sidebar/SuggestionContainer";

const BuildingEditor = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: "#eceef8",
      //background: "#3F51B5",
      maxHeight: "100vh",
    },
    editorContainer: {
      padding: theme.spacing(0),
      minHeight: "91vh",
    },
    editorComponent: {
      border: "0px solid black",
      borderRadius: "2px",
      height: "90vh",
      maxHeight: "91vh",
      minHeight: "91vh",
    },
    suggestionContainer: {
      minHeight: "91vh",
      maxHeight: "91vh",
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
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
    rowNoBorder: {
      marginBottom: theme.spacing(1)
    },
    formComponent: {
      marginBottom: theme.spacing(0),
      marginRight: theme.spacing(0),
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
      marginTop: theme.spacing(0),
      padding: theme.spacing(0),
      borderLeft: "2px solid #E0E0E0", //debug
    },
    modal: {
      position: "absolute",
      width: 400,
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
    },
  }));

  const styleComponent = useStylesForEditorComponent();
  const { getStepComponent, activeStep } = useEditor();

  // Render area selection and summary with no Sidebar
  if (activeStep === 0 || activeStep === 6) {
    return (
      <React.Fragment>
        <Grid className={classes.root} container sm={12} md={12} lg={12}>
          <Grid
            className={classes.editorContainer}
            item
            sm={12}
            md={12}
            lg={12}
          >
            <Paper className={classes.editorComponent}>
              {getStepComponent(styleComponent)}
            </Paper>
          </Grid>
        </Grid>
        <EditorNavigationBar />
      </React.Fragment>
    );
  }

  // Render other components with Sidebar
  return (
    <React.Fragment>
      <Grid className={classes.root} container sm={12} md={12} lg={12}>
        <Grid className={classes.editorContainer} item sm={9} md={9} lg={9}>
          <Paper className={classes.editorComponent}>
            {getStepComponent(styleComponent)}
          </Paper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <Paper className={classes.suggestionContainer}>
            <SuggestionContainer />
          </Paper>
        </Grid>
      </Grid>
      <EditorNavigationBar />
    </React.Fragment>
  );
};

export default BuildingEditor;
