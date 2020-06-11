import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Home from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { useBackend } from "../../utils/FakeBackend";
import history from "../../utils/history";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  navbar: {
    boxShadow: "0px 1px 5px #999",
  },
  navButton: {
    "&:hover": {
      backgroundColor: "#354497",
    }
  },
  title: {
    flexGrow: 1,
  },
}));


const NavigationBar = (props) => {
  const { user, fakeLogout } = useBackend();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutAlert, setLogoutAlert] = useState(false);

  const handleProfileMenuClose = (event) => {
    console.log(anchorEl);
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const redirectTo = (addr) => {
    history.push(addr);
  }

  const _logout = () => {
    setLogoutAlert(true);
    fakeLogout();
  }

  const _logoutAlertClose = () => {
    setLogoutAlert(false);
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.navbar}>
        <Typography variant="h6" className={classes.title}>EnergyPathfinder</Typography>
        <IconButton onClick={() => { redirectTo('') }} color="inherit" className={classes.navButton} >
          <Home />
        </IconButton>
        <Button onClick={() => { redirectTo('/design') }} color="inherit" className={classes.navButton}>
          Design
        </Button>
        {user && (
          <div>
            <IconButton
              className={classes.navButton}
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={() => { redirectTo('/buildings') }}>
                Designed buildings
              </MenuItem>
              <MenuItem onClick={() => { redirectTo('/feedback') }}>
                Give feedback
              </MenuItem>
              <MenuItem onClick={_logout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
        {!user && (
          <Button className={classes.navButton} onClick={() => { redirectTo('/login') }} color="inherit">
            Login
          </Button>
        )}

      </Toolbar>

      <Snackbar 
        open={logoutAlert}
        autoHideDuration={6000}
        onClose={_logoutAlertClose}
        anchorOrigin={ {horizontal: 'center', vertical: 'top' } }
      >
        <Alert onClose={_logoutAlertClose} severity="info">
          Successfully logged out.
        </Alert>
      </Snackbar>

    </AppBar>
  );
};

export default NavigationBar;
