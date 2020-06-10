import React, { useState, useEffect } from "react";
import Tip from "./Tip";
import { Grid } from "@material-ui/core/";
import { useBackend } from "../../utils/FakeBackend";

const Tips = () => {
  const { getTips } = useBackend();
  const tips = getTips();

  return (
    <Grid container spacing={2}>
      {tips.map((tip, index) => (
        <Grid item>
          <Tip key={index} text={tip} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Tips;
