import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fade, Button } from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";

import BuildingViewer from "../BuildingViewer/BuildingViewer";

const useStyles = makeStyles((theme) => ({
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
  categoryGrid: {
    flexGrow: 1,
  },
  category: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
}));

const Summary = () => {
  const { buildingInformation, PostBuilding } = useEditor();

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <React.Fragment>
      <Button onClick={() => PostBuilding()}> submit</Button>
      <BuildingViewer building={buildingInformation} />
    </React.Fragment>
  );
};

export default Summary;
