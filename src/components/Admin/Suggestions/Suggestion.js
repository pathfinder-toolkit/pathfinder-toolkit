import React from "react";
import { Typography, Grid } from "@material-ui/core";

const Suggestion = (props) => {
  const suggestion = props?.suggestion;

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item>
          <Typography>
            <b>Text: "</b>
            {suggestion.suggestion}"
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item>
          <Typography>
            <b>Subject:</b> {suggestion.conditions[0].subject}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item>
          <Typography>
            <b>Areas:</b>
          </Typography>
        </Grid>
        {suggestion.areas.map((area) => {
          return (
            <Grid item>
              <Typography>{area.areaName},</Typography>
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={1}>
        <Grid item>
          <Typography>
            <b>Conditions:</b>
          </Typography>
        </Grid>
        {suggestion.conditions.map((condition) => {
          return (
            <Grid item>
              <Typography>
                {condition.conditionedBy} / {condition.condition}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Suggestion;
