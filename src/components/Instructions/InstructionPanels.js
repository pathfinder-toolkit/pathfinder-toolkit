import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import PanelImage from "./PanelImage";
import PanelParagraph from "./PanelParagraph";
import PanelGap from "./PanelGap";

import panel1a from "../../external/images/instructions/panel1a.JPG";
import panel1b from "../../external/images/instructions/panel1b.JPG";
import panel2a from "../../external/images/instructions/panel2a.JPG";
import panel2b from "../../external/images/instructions/panel2b.JPG";
import panel2c from "../../external/images/instructions/panel2c.JPG";
import panel3a from "../../external/images/instructions/panel3a.JPG";
import panel4a from "../../external/images/instructions/panel4a.JPG";
import panel4b from "../../external/images/instructions/panel4b.JPG";
import panel5a from "../../external/images/instructions/panel5a.JPG";
import panel5b from "../../external/images/instructions/panel5b.JPG";
import panel5c from "../../external/images/instructions/panel5c.JPG";
import panel6a from "../../external/images/instructions/panel6a.JPG";
import panel6b from "../../external/images/instructions/panel6b.JPG";
import panel6c from "../../external/images/instructions/panel6c.JPG";
import panel6d from "../../external/images/instructions/panel6d.JPG";
import panel6e from "../../external/images/instructions/panel6e.JPG";
import panel7a from "../../external/images/instructions/panel7a.JPG";
import panel7b from "../../external/images/instructions/panel7b.JPG";
import panel7c from "../../external/images/instructions/panel7c.JPG";
import panel7d from "../../external/images/instructions/panel7d.JPG";
import panel7e from "../../external/images/instructions/panel7e.JPG";

const useStyles = makeStyles((theme) => ({
  panelContainer: {
    marginTop: theme.spacing(2)
  },
  panelItem: {
    marginBottom: theme.spacing(1),
    minWidth: "70vw"
  },
  instructionText: {
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSizeAdjust: 0.7,
    display: "block"
  },
  image: {
    paddingBottom: theme.spacing(1)
  },
  gap: {
    height: theme.spacing(2)
  }
}));

const InstructionPanels = () => {

  const classes = useStyles();

  const [expandedPanel, setExpandedPanel] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpandedPanel(newExpanded ? panel : false);
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
            <Button variant="contained" color="primary" onClick={() => { setExpandedPanel('panel2') }}>Next step</Button>
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
          <Grid container direction="column">
            <PanelParagraph classes={classes}>
              Select the applicable area on the map by clicking on it
            </PanelParagraph>
            <PanelImage image={panel2a} style={classes.image} />
            <PanelParagraph classes={classes}>
              You can then click the Next button on the bottom left
            </PanelParagraph>
            <PanelImage image={panel2b} style={classes.image} />
            <PanelParagraph classes={classes}>
              or click on <b>2. General information</b> on the list on the left
            </PanelParagraph>
            <PanelImage image={panel2c} style={classes.image} />
            <Button variant="contained" color="primary" onClick={() => { setExpandedPanel('panel3') }}>Next step</Button>
          </Grid>
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
          <Typography variant="h6">General information</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <PanelParagraph classes={classes}>
              Put in as many details as you wish into the fields below.
            </PanelParagraph>
            <PanelImage image={panel3a} style={classes.image} />
            <PanelParagraph classes={classes}>
              Only Building name noted above is mandatory to continue.
            </PanelParagraph>
            <PanelGap style={classes.gap} />
            <PanelParagraph classes={classes}>
              <b>Note:</b> None of the information you input will be shared publicly, unless you make your building publicly available.
            </PanelParagraph>
            <PanelGap style={classes.gap} />
            <PanelParagraph classes={classes}>
              Input as many details as you wish in steps 2-6. The more information you enter, the better we are able to tailor our suggestions to fit your needs.
            </PanelParagraph>
            <PanelGap style={classes.gap} />
            <Button variant="contained" color="primary" onClick={() => { setExpandedPanel('panel4') }}>Next step</Button>
          </Grid>
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
          <Typography variant="h6">Live suggestions</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <PanelParagraph classes={classes}>
              When you make selections in Pathfinder, keep an eye out on the right side for our live suggestions.
            </PanelParagraph>
            <PanelImage image={panel4a} style={classes.image} />
            <PanelParagraph classes={classes}>
              In this case, if you have an oil-based heating system, our suggestion is to switch from it to another alternative.
            </PanelParagraph>
            <PanelGap style={classes.gap} />
            <PanelParagraph classes={classes}>
              You may also select user experiences above to view what our other users thought about individual components of their buildings.
            </PanelParagraph>
            <PanelImage image={panel4b} style={classes.image} />
            <PanelParagraph classes={classes}>
              At a later step, you are able to submit your own experiences as well.
            </PanelParagraph>
            <PanelGap style={classes.gap} />
            <PanelParagraph classes={classes}>
              By clicking on the blue tags, you can select which components you want to see our suggestions or other users' experiences about.
            </PanelParagraph>
            <PanelGap style={classes.gap} />
            <Button variant="contained" color="primary" onClick={() => { setExpandedPanel('panel5') }}>Next step</Button>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
    <Grid item className={classes.panelItem} xs={8}>
      <ExpansionPanel expanded={expandedPanel === 'panel5'} onChange={handleChange('panel5')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >
          <Typography variant="h6">Old components changelog</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <PanelParagraph classes={classes}>
              If your building has had renovations, you are able to make a changelog of what indidividual parts/systems have changed in your building.
            </PanelParagraph>
            <PanelParagraph classes={classes}>
              Start by toggling on Old information on top of the editor.
            </PanelParagraph>
            <PanelImage image={panel5a} style={classes.image} />
            <PanelParagraph classes={classes}>
              You will see the Changelog button appear on top, and some + symbols appear on the editor.
            </PanelParagraph>
            <PanelGap style={classes.gap} />
            <PanelParagraph classes={classes}>
              Click on the + symbols to add previous entries of the selected component.
            </PanelParagraph>
            <PanelImage image={panel5b} style={classes.image} />
            <PanelParagraph classes={classes}>
              Once you select the details and click add, it will be added to that selections changelog.
            </PanelParagraph>
            <PanelGap style={classes.gap} />
            <PanelParagraph classes={classes}>
              You can view the changelog by pressing the Changelog button and selecting which component's changelog you wish to see.
            </PanelParagraph>
            <PanelImage image={panel5c} style={classes.image} />
            <PanelParagraph classes={classes}>
              You can also remove entries from the changelog in this page.
            </PanelParagraph>
            <PanelGap style={classes.gap} />
            <PanelParagraph classes={classes}>
              Once you're finished with sections 2-6, you can move on to 7. Summary.
            </PanelParagraph>
            <Button variant="contained" color="primary" onClick={() => { setExpandedPanel('panel6') }}>Next step</Button>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
    <Grid item className={classes.panelItem} xs={8}>
      <ExpansionPanel expanded={expandedPanel === 'panel6'} onChange={handleChange('panel6')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6a-content"
          id="panel6a-header"
        >
          <Typography variant="h6">Summary</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <PanelParagraph classes={classes}>
              In the Summary page, you will see the full building preview with all the data you input.
              You can go back to the previous pages and edit them, if you wish to add more information.
            </PanelParagraph>
            <PanelImage image={panel6a} style={classes.image} />
            <PanelParagraph classes={classes}>
              If you haven't already created an account, now would be a good time to register,
              so you can store your input information for later. The information you input into Pathfinder will be 
              saved while you create an account.
            </PanelParagraph>
            <PanelParagraph classes={classes}>
              Start by clicking on the notification that appears on top of Summary page
            </PanelParagraph>
            <PanelImage image={panel6b} style={classes.image} />
            <PanelParagraph classes={classes}>
              or by clicking Login at any time in the top navigation bar
            </PanelParagraph>
            <PanelImage image={panel6c} style={classes.image} />
            <PanelParagraph classes={classes}>
              then sign up in the form that will appear.
            </PanelParagraph>
            <PanelImage image={panel6d} style={classes.image} />
            <PanelParagraph classes={classes}>
              You can now go back to the Summary page on the editor and Submit your building to store it permanently.
            </PanelParagraph>
            <PanelImage image={panel6e} style={classes.image} />
            <PanelParagraph classes={classes}>
              After the submission has processed, you will be automatically directed to your building's viewer page.
            </PanelParagraph>
            <Button variant="contained" color="primary" onClick={() => { setExpandedPanel('panel7') }}>Next step</Button>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
    <Grid item className={classes.panelItem} xs={8}>
      <ExpansionPanel expanded={expandedPanel === 'panel7'} onChange={handleChange('panel7')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7a-content"
          id="panel7a-header"
        >
          <Typography variant="h6">Viewer page</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <PanelParagraph classes={classes}>
              The viewer page has a selection of the most important suggestions we have for you at the top,
              followed by a list of all the information you provided as well as all the suggestions we have for each
              part, and you can view other users' experiences about each individual part as well.
            </PanelParagraph>
            <PanelImage image={panel7a} style={classes.image} />
            <PanelParagraph classes={classes}>
              You can get back to this page later logging in and clicking on the profile button on the top right of the navigation bar,
              then selecting Designed buildings
            </PanelParagraph>
            <PanelImage image={panel7b} style={classes.image} />
            <PanelParagraph classes={classes}>
              and then selecting the building you want to access from the list
            </PanelParagraph>
            <PanelImage image={panel7c} style={classes.image} />
            <PanelParagraph classes={classes}>
              You can use the user actions on the right to make the building public, delete it or go back to the editor and update its details.
            </PanelParagraph>
            <PanelImage image={panel7d} style={classes.image} />
            <PanelParagraph classes={classes}>
              If you choose to make the building public, you will get another link to access the public page of your building.
              You can then pass this link on to other people, and they can see the same page you are seeing as well. Otherwise, only you will be
              able to see your building, while you're logged in.
            </PanelParagraph>
            <PanelGap style={classes.gap} />
            <PanelParagraph classes={classes}>
              Feel free to experiment with other features, such as creating user experiences. Your feedback is appreciated, and will be taken
              into consideration when further developing Pathfinder. You can submit your feedback by clicking on the account icon while logged in
              at the top navigation bar.
            </PanelParagraph>
            <PanelImage image={panel7e} style={classes.image} />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  </Grid>
}

export default InstructionPanels;