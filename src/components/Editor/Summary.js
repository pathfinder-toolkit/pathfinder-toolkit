import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fade, Button, Modal, Typography } from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import { useBackend } from "../../utils/BackendProvider";

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
    //console.log(message)
    //setMessage(message);
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
      <Button
        onClick={() => submitBuilding()}
        variant="outlined"
        color="primary"
      >
        submit
      </Button>
      <Button
        onClick={() => submitUpdateBuilding()}
        variant="outlined"
        color="primary"
      >
        Update test
      </Button>
      <Typography>Slug: {props?.slug}</Typography>
      <BuildingViewer building={buildingInformation} />
    </React.Fragment>
  );
};

export default Summary;
