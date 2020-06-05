import React from "react";

import Grid from "@material-ui/core/Grid";
import NavigationBar from "../../components/Navigation/NavigationBar";
import { EditorProvider } from "../../utils/EditorProvider";
import EditorStepper from "../../components/Editor/EditorStepper";
import BuildingEditor from "../../components/Editor/BuildingEditor";

const DesignPage = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <EditorProvider>
        <Grid container>
          <Grid sm={2} md={2} lg={2}>
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
