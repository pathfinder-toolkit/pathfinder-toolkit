import React, {useState} from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import { Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import frontPageImage from "../../external/images/frontpage_house.jpg"

const useStyles = makeStyles((theme) => ({
    banner: {
      height:720,
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
      bottom:20,
      right:20
    }
  }));

const FrontPage = () => {

    const classes = useStyles();

    const [expandedPanel, setExpandedPanel] = useState('panel1');

    const handleChange = ( panel ) => ( event, newExpanded )  => {
      setExpandedPanel( newExpanded ? panel : false );
    }

    return <React.Fragment>
        <NavigationBar />

        <Grid container justify="center">
          <Grid xs="12" className={classes.banner}>
            <Typography align="center" className = {classes.bannerHeader}  variant="h1">
              Pathfinder
            </Typography>
          </Grid>
        </Grid>

        <Grid container className={classes.panelContainer} justify="center" direction="column" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <ExpansionPanel expanded={expandedPanel === 'panel1'} onChange={handleChange('panel1')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.panelHeading}>Expansion Panel 1</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          </Grid>
          <Grid item xs={12}>
          <ExpansionPanel expanded={expandedPanel === 'panel2'} onChange={handleChange('panel2')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.panelHeading}>Expansion Panel 2</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          </Grid>
        </Grid>
        <Button variant="contained" className={classes.designButton}>
          <Typography>
              Start designing
          </Typography>
        </Button>
    </React.Fragment>
}

export default FrontPage;