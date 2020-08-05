import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import { Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import PanelImage from "./PanelImage";
import PanelParagraph from "./PanelParagraph";

import panel1a from "../../external/images/instructions/panel1a.JPG";
import panel1b from "../../external/images/instructions/panel1b.JPG";

const useStyles = makeStyles((theme) => ({
    panelContainer: {
      marginTop: theme.spacing(2)
    },
    panelItem: {
      marginBottom: theme.spacing(1)
    },
    instructionText: {
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      fontSizeAdjust: 0.7,
      display: "block"
    },
    image: {
      paddingBottom: theme.spacing(1)
    }
  }));

const InstructionPanels = () => {

    const classes = useStyles();

    const [expandedPanel, setExpandedPanel] = useState('panel1');

    const handleChange = ( panel ) => ( event, newExpanded )  => {
      setExpandedPanel( newExpanded ? panel : false );
    }

    return <Grid container className={classes.panelContainer} justify="center" direction="column" alignItems="center" fullWidth spacing={0}>
    <Grid item className={classes.panelItem} xs={8}>
      <ExpansionPanel expanded={expandedPanel === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Start designing</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <PanelParagraph classes={classes}>
              Start using Pathfinder by clicking Design on the top navigation bar
            </PanelParagraph>
            <PanelImage image={panel1a} style={classes.image} />
            <PanelParagraph classes={classes}>
              or click the Pen icon visible on the right side on the home page
            </PanelParagraph>
            <PanelImage image={panel1b} style={classes.image} />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </Grid>
      <Grid item className={classes.panelItem} xs={8}>
      <ExpansionPanel expanded={expandedPanel === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">Area Selection</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </Grid>
      <Grid item className={classes.panelItem} xs={8}>
      <ExpansionPanel expanded={expandedPanel === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant="h6">Ventilation & Heating</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </Grid>
      <Grid item className={classes.panelItem} xs={8}>
      <ExpansionPanel expanded={expandedPanel === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography variant="h6">Check out your results</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </Grid>
    </Grid>
}

export default InstructionPanels;