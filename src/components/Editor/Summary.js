import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Grid, Typography } from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";

import BuildingViewer from "../BuildingViewer/BuildingViewer";
import SubmitModal from "./reusable/SubmitModal";
import UpdateModal from "./reusable/UpdateModal";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Summary = (props) => {
  const { buildingInformation, postBuilding, updateBuilding } = useEditor();

  const classes = useStyles();

  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [buildingLoading, setBuildingLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const submitBuilding = async () => {
    setOpen(true);
    setBuildingLoading(true);
    const message = await postBuilding();
    if (message === null) {
      setBuildingLoading(false);
      setOpen(false);
    } else {
      setBuildingLoading(false);
      setMessage(message.toString());
      const interval = setInterval(() => {
        clearInterval(interval);
        setMessage();
        setOpen(false);
      }, 2000);
    }
  };

  const submitUpdateBuilding = async () => {
    setOpen(true);
    console.log("submitUpdateBuilding");
    const message = await updateBuilding();
    if (message.status == "200") {
      setMessage("Building updated");
    }
  };

  return (
    <React.Fragment>
      {props.slug && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <UpdateModal message={message} slug={props.slug} />
        </Modal>
      )}
      {!props.slug && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <SubmitModal message={message} />
        </Modal>
      )}
      <Grid
        style={{
          padding: "5em",
          margin: "1em",
          backgroundColor: "#eceef8",
          borderRadius: "4px",
        }}
        justify="center"
      >
        <Grid item>
          <Button
            onClick={() => {
              if (props.slug) {
                submitUpdateBuilding();
              } else {
                submitBuilding();
              }
            }}
            variant="contained"
            color="primary"
          >
            {props.slug ? "Update building" : "Submit building"}
          </Button>
        </Grid>
      </Grid>
      <Typography style={{ paddingLeft: "1em" }} variant="h4">
        Building preview
      </Typography>
      <BuildingViewer building={buildingInformation} />
    </React.Fragment>
  );
};

export default Summary;
