import React from "react";

import Grid from "@material-ui/core/Grid";
import EditorStepper from '../../components/EditorStepper'
import BuildingEditor from '../../components/BuildingEditor'

const DesignPage = () => {

  return (
    <Grid container>
      <Grid sm={2} md={2} lg={2}>
        <EditorStepper/>
      </Grid>
      <Grid sm={10} md={10} lg={10}>
      <BuildingEditor/>
      </Grid>
    </Grid>
  );
}

export default DesignPage;
