import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";

const ConditionInfo = (props) => {
  const classes = props.classes;

  const subject = props?.subject;
  const areas = props?.areas;
  const priority = props?.priority;
  const conditions = props?.conditions;

  return (
    <div className={classes.bordered}>
      <Typography>Subject: {subject?.subject}</Typography>
      <Typography>
        Conditions:
        {conditions?.map((item, index) => (
          <Typography>
            {item.condition} | {item.conditionedBy}
          </Typography>
        ))}
      </Typography>
      <Typography>
        Areas:
        {areas?.map((item, index) => (
          <Typography>{item.areaName}</Typography>
        ))}
      </Typography>
      <Typography>Priority: {priority}</Typography>
    </div>
  );
};

export default ConditionInfo;
