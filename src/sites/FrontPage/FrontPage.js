import React from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import { CssBaseline } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import frontPageImage from "../../external/images/frontpage_house.jpg"

const useStyles = makeStyles((theme) => ({
    banner: {
      height:720,
      backgroundImage: 'url('+ frontPageImage+')',
      backgroundPosition: 'center bottom'
    }
  }));

const FrontPage = () => {

    const classes = useStyles();

    return <CssBaseline>
      <React.Fragment>
        <NavigationBar />
        <Grid container >
          <Grid xs="12" className={classes.banner}>
          </Grid>
        </Grid>
    </React.Fragment>
    </CssBaseline>
}

export default FrontPage;