import React, {useState} from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import { Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import frontPageImage from "../../external/images/frontpage_house.jpg"
import InstructionPanels from "./InstructionPanels"

const useStyles = makeStyles((theme) => ({
    banner: {
      height:660,
      backgroundImage: 'url('+ frontPageImage+')',
      backgroundPosition: 'center bottom',
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column"
    },
    bannerHeader: {
      marginTop: "auto",
      marginBottom: 80,
      fontSize: "4.5em",
      textShadow: "-0.03em 0 black, 0 0.03em black, 0.03em 0 black, 0 -0.03em black",
      color: "white"
    },
    panelContainer: {
      marginTop:20
    },
    panelHeading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    designButton: {
      position: "fixed",
      bottom:26,
      right:26
    }
  }));

const FrontPage = () => {

    const classes = useStyles();

    return <React.Fragment>
        <NavigationBar />

        <Grid container justify="center">
          <Grid xs="12" className={classes.banner}>
            <Typography align="center" className = {classes.bannerHeader}  variant="h1">
              Pathfinder
            </Typography>
          </Grid>
        </Grid>

        <InstructionPanels></InstructionPanels>

        <Button variant="contained" color="primary" className={classes.designButton} href="/design">
          <Typography>
              Start designing
          </Typography>
        </Button>
    </React.Fragment>
}

export default FrontPage;