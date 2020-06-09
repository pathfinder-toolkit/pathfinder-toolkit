import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../../components/Navigation/NavigationBar";
import { EditorProvider } from "../../utils/EditorProvider";
import EditorStepper from "../../components/Editor/EditorStepper";
import BuildingEditor from "../../components/Editor/BuildingEditor";

const DesignPage = () => {
  const useStyles = makeStyles((theme) => ({
    sidebar: {
      backgroundColor: "#FFFFFF",
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <NavigationBar />
      <EditorProvider>
        <Grid container>
          <Grid className={classes.sidebar} sm={2} md={2} lg={2}>
            <EditorStepper />
          </Grid>
          <Grid sm={10} md={10} lg={10}>
            <BuildingEditor />
          </Grid>
        </Grid>
      </EditorProvider>
    </React.Fragment>
  );
};

export default DesignPage;
