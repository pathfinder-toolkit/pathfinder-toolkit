import React from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import frontPageImage from "../../external/images/frontpage_house.jpg"
import InstructionPanels from "../../components/Instructions/InstructionPanels"

import history from "../../utils/history";

const useStyles = makeStyles((theme) => ({
    root: {
      padding:0,
      backgroundColor: "#eceef8",
    },
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
    infoPaper: {
      marginLeft: 10,
      marginTop: 10,
      height:100,
      display: "flex",
      flexDirection: "column",
    },
    infoMessage: {
      margin:"auto",
      fontSize: theme.typography.pxToRem(18),
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

    const redirectTo = (addr) => {
      history.push(addr);
    }

    return <Container maxWidth="disabled" className={classes.root}>
        <NavigationBar />

        <Grid container justify="center">
          <Grid xs="12" className={classes.banner}>
            <Typography align="center" className = {classes.bannerHeader}  variant="h1">
              Pathfinder
            </Typography>
          </Grid>
        </Grid>

        <Grid container xs="12" direction="row" alignItems="center" spacing={2} >
          <Grid item xs="4">
            <Paper className={classes.infoPaper}>
              <Typography className={classes.infoMessage} >Start by inputting your building details</Typography>
            </Paper>
          </Grid>
          <Grid item xs="4">
            <Paper className={classes.infoPaper}>
              <Typography className={classes.infoMessage} >Pathfinder estimates your energy efficiency</Typography>
            </Paper>
          </Grid>
          <Grid item xs="4">
            <Paper className={classes.infoPaper}>
              <Typography className={classes.infoMessage} >Check out our suggestion for improvements</Typography>
            </Paper>
          </Grid>
        </Grid>

        <InstructionPanels />

        <Button variant="contained" color="primary" className={classes.designButton} onClick={() => { redirectTo('design') } }>
          <Typography>
              Start designing
          </Typography>
        </Button>
    </Container>
}

export default FrontPage;