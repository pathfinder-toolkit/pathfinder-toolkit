import React, { useState, useEffect } from "react";
import Tip from "./Tip";
import { Grid } from "@material-ui/core/";

const Tips = () => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Tip
          text="Pellentesque nunc urna, dapibus ac pulvinar sed, rutrum ac
                ligula."
        />
      </Grid>
      <Grid item>
        <Tip text="Lorem ipsum dolor sit amet" />
      </Grid>
      <Grid item>
        <Tip text="diam leo, vehicula ac dui ut" />
      </Grid>
      <Grid item>
        <Tip text="Duis maximus magna nibh" />
      </Grid>
    </Grid>
  );
};

export default Tips;
