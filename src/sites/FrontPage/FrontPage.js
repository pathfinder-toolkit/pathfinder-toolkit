import React, {useState} from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import frontPageImage from "../../external/images/frontpage_house.jpg"
import Create from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import history from "../../utils/history";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    backgroundColor: "#eceef8",
  },
  banner: {
    height: 660,
    backgroundImage: 'url(' + frontPageImage + ')',
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
  infoGrid: {
    display: "flex",
    padding: 0,
    margin: 0,
    flexWrap: "nowrap"
  },
  infoPaper: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 100,
    display: "flex",
    flexDirection: "column"
  },
  infoMessage: {
    margin: "auto",
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  designButton: {
    position: "fixed",
    bottom: 26,
    right: 26,
    backgroundColor: "#4054b4",
    color: "white",
    "&:hover": {
      backgroundColor: "#283371",
      color: "#efe0b3",
    }
  },
  demoButton: {
    margin: theme.spacing(1)
  },
  instructionsLinkContainer: {
    maxWidth: "30%",
    margin: "auto",
    marginTop: theme.spacing(4),
    backgroundColor: "#faf9c7",
  },
  instructionsLinkButton: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}));

const FrontPage = () => {

  const classes = useStyles();

  const redirectTo = (addr) => {
    history.push(addr);
  }

  const [ hideInstructions, setHideInstructions ] = useState(false);

  return <Container maxWidth={false} className={classes.root}>
    <NavigationBar />

    <Grid container justify="center">
      <Grid item xs={12} className={classes.banner}>
        <Box display={hideInstructions && "none"}>
          <Card  className={classes.instructionsLinkContainer}>
            <CardHeader
              action={
                <IconButton onClick={() => { setHideInstructions(true)}}>
                  <CloseIcon />
                </IconButton>
              }
              title="Instructions"
              subheader={<React.Fragment>
                Click the link below to view instructions for Energy Pathfinder
              </React.Fragment>}
            />
            <Button variant="contained" color="primary" className={classes.instructionsLinkButton} onClick={() => { redirectTo('instructions') } }>
              Instructions
            </Button>
          </Card>
        </Box>
        <Typography align="center" className={classes.bannerHeader} variant="h1">
          EnergyPathfinder
        </Typography>
      </Grid>
    </Grid>

    <Grid container direction="row" alignItems="center" spacing={0} className={classes.infoGrid} >
      <Grid item xs={4}>
        <Paper className={classes.infoPaper}>
          <Typography className={classes.infoMessage} >Start by inputting your building details</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.infoPaper}>
          <Typography className={classes.infoMessage} >Pathfinder estimates your energy efficiency</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4} >
        <Paper className={classes.infoPaper}>
          <Typography className={classes.infoMessage} >Check out our suggestion for improvements</Typography>
        </Paper>
      </Grid>
    </Grid>

    <Grid container direction="row" alignItems="center" justify="center" className={classes.infoGrid} >
      <Grid item xs={4}>
        <Paper className={classes.infoPaper}>
          <Typography className={classes.infoMessage} >View ready-made example demo buildings</Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.demoButton}
            onClick={() => { redirectTo('demo') }}>
            Demo buildings
          </Button>
        </Paper>
      </Grid>
    </Grid>

    <Fab className={classes.designButton} onClick={() => { redirectTo('design') }}>
      <Create fontSize="large" />
    </Fab>

  </Container>
}

export default FrontPage;