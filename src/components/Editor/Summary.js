import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fade, Button, Modal, Typography } from "@material-ui/core";

import { useEditor } from "../../utils/EditorProvider";
import { useBackend } from "../../utils/BackendProvider";

import BuildingViewer from "../BuildingViewer/BuildingViewer";
import SubmitModal from "./reusable/SubmitModal";
import { SettingsSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Summary = () => {
  const { buildingInformation } = useEditor();
  const { postBuilding } = useEditor();

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

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <SubmitModal message={message} />
      </Modal>
      <Button onClick={() => submitBuilding()}> submit</Button>
      <BuildingViewer building={buildingInformation} />
    </React.Fragment>
  );
};

export default Summary;
