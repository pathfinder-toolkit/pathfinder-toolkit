import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));

const NavigationBar = () => {

    const classes = useStyles();

    return <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
                Front Page
            </Typography>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
}

export default NavigationBar;