import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { makeStyles } from "@material-ui/core/styles";
import history from "../../utils/history";

import landsverk from "../../external/images/logos/landsverk.png";
import oamk from "../../external/images/logos/oamk.png";
import historic from "../../external/images/logos/historic.png";
import nce from "../../external/images/logos/nce.jpg";
import umea from "../../external/images/logos/umea.png";
import ucc from "../../external/images/logos/ucc.png";

const useStyles = makeStyles((theme) => ({
  infoBox: {
    marginTop: "0.2em",
    backgroundColor: "#eceef8",
    paddingTop: "0em",
    paddingRight: "2em",
    paddingLeft: "2em",
    borderRadius: "4px",
  },
  infoHeader: {
    marginBottom: "10px",
  },
  infoButton: {
    marginTop: "20px",
  },
  credits: {
    marginTop: "10px",
    borderTop: "1px solid black",
  },
  media: {},
  root: {},
}));

const About = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item md={10} className={classes.infoBox}>
        <Typography align="" variant="h2" className={classes.infoHeader}>
          Energy Pathfinder
        </Typography>
        <Typography>
          Historic buildings represent one of the biggest challenges for
          improving energy efficiency in the Northern Periphery and Arctic
          region. The Energy Pathfinder project will work with owners,
          residents, and other stakeholders in identifying and addressing these
          challenges.
        </Typography>
        <br />
        <Typography>
          The main outcome from the project will be an online tool kit that will
          support owners of historical buildings to carry out an energy retrofit
          that is socially, culturally and environmentally appropriate. Energy
          Pathfinder involves six partners from Ireland, Sweden, Scotland,
          Finland and the Faroe Islands and is supported by the European Union
          through the Interreg programme for the Northern Periphery and Arctic
          Region.
        </Typography>
        <br />
        <Typography align="" variant="h3" className={classes.infoHeader}>
          Energy Pathfinder Toolkit
        </Typography>
        <Typography>
          Building owners and users need an online Toolkit that can be used to
          chart how Near Zero Energy standards can be achieved in historic
          buildings in different regions. In order to develop and demonstrate
          the toolkit, Energy Pathfinder will work with owners and other
          stakeholders through a participatory design process.
        </Typography>
        <br />
        <Typography>
          The Toolkit will draw results from this co-design process as well as
          from an analysis of relevant retrofit measures and renewable energy
          installations, proposed or carried out on demonstrator buildings, to
          help owners decide what measures are most appropriate and effective to
          help their building reach Near Zero Energy Building standards.
        </Typography>
        <Grid className={classes.credits}>
          <Typography
            style={{ marginTop: "5px", marginBottom: "5px" }}
            align="center"
            variant="h5"
          >
            Partners
          </Typography>
          <Grid container spacing={1}>
            <Grid item md={2}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt="Cork Centre for Architectural Education"
                  image={ucc}
                  title="Cork Centre for Architectural Education"
                />

                <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="h2">
                    Cork Centre for Architectural Education
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    <b>Lead partner</b> Ireland
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={2}>
              <Card className={classes.root}>
                <CardMedia
                  component="img"
                  alt="NCE Insulation - Energy Hub"
                  image={nce}
                  title="NCE Insulation - Energy Hub"
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="h2">
                    NCE Insulation - Energy Hub
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    Ireland
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={2}>
              <Card className={classes.root}>
                <CardMedia
                  component="img"
                  alt="Historic Environment Scotland"
                  image={historic}
                  title="Historic Environment Scotland"
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="h2">
                    Historic Environment Scotland
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    United Kingdom
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={2}>
              <Card className={classes.root}>
                <CardMedia
                  component="img"
                  alt="Landsverk"
                  image={landsverk}
                  title="Landsverk"
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="h2">
                    Landsverk
                  </Typography>
                  <br />
                  <Typography variant="body2" color="textPrimary" component="p">
                    Faroe Islands
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={2}>
              <Card className={classes.root}>
                <CardMedia
                  component="img"
                  alt="Oulu University of Applied Sciences"
                  image={oamk}
                  title="Oulu University of Applied Sciences"
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="h2">
                    Oulu University of Applied Sciences
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    Finland
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={2}>
              <Card className={classes.root}>
                <CardMedia
                  component="img"
                  alt="Umeå University"
                  image={umea}
                  title="Umeå University"
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="h2">
                    Umeå University
                  </Typography>
                  <br />
                  <Typography variant="body2" color="textPrimary" component="p">
                    Sweden
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          align="center"
          className={classes.credits}
          style={{ borderBottom: "1px solid black", paddingBottom: "10px" }}
        >
          <Typography
            style={{ marginTop: "5px", marginBottom: "5px" }}
            align="center"
            variant="h5"
          >
            Authors
          </Typography>
          <Grid>
            <Typography align="">- Pekka Alaluukas</Typography>
            <Typography align="">- Tommi Riippa</Typography>
            <Typography align="">- Sami Jouppila</Typography>
            <Typography align="">- Miikka Kortelainen</Typography>
            <Typography align="">- Seppo Perälä</Typography>
            <Typography align="">- Arman Kouch</Typography>
          </Grid>
        </Grid>

        <Grid item align="center">
          <Button
            className={classes.infoButton}
            color="primary"
            variant="contained"
            onClick={() => history.push("/")}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default About;
