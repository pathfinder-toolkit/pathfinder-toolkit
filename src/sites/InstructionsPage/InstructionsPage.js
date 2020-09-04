import React from "react";
import NavigationBar from '../../components/Navigation/NavigationBar';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import frontPageImage from "../../external/images/frontpage_house.jpg"
import InstructionPanels from "../../components/Instructions/InstructionPanels"

const useStyles = makeStyles((theme) => ({
    root: {
      padding: 0,
      backgroundColor: "#eceef8",
    }
  }));

const InstructionsPage = () => {
    const classes = useStyles();
    
    return <Container maxWidth={false} className={classes.root}>
    <NavigationBar />

    <InstructionPanels />

  </Container>
}

export default InstructionsPage;