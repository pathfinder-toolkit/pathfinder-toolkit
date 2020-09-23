import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Home from "@material-ui/icons/Home";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import { makeStyles } from "@material-ui/core/styles";

import history from "../../utils/history";

import { useAuth0 } from "../../utils/react-auth0-spa";

import PathfinderLogo from "../../external/images/logos/energypathfinder.jpg";
import NorthernPeriferyLogo from "../../external/images/logos/northernperiphery.jpg";
import EuropeanUnionLogo from "../../external/images/logos/europeanunion.jpg";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  navbar: {
    boxShadow: "0px 1px 0px #999",
  },
  navButton: {
    "&:hover": {
      backgroundColor: "#354497",
    },
  },
  title: {
    cursor: "pointer"
  },
  filler: {
    flexGrow: 1,
    padding: 0
  },
  logo: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    maxHeight: "7vh"
  },
  image: {
    height: "6.5vh"
  }
}));

const NavigationBar = (props) => {
  const { loading, isAuthenticated, loginWithRedirect, logout, isAdmin } = useAuth0();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutAlert, setLogoutAlert] = useState(false);

  const handleMenuClose = (event) => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const redirectTo = (addr) => {
    history.push(addr);
  };

  const _logoutAlertClose = () => {
    setLogoutAlert(false);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.navbar}>
        <Typography variant="h6" onClick={() => {redirectTo("")}} className={classes.title}>
          EnergyPathfinder
        </Typography>
        <Card className={classes.logo}>
          <CardMedia>
            <img src={EuropeanUnionLogo} className={classes.image} />
          </CardMedia>
        </Card>
        <Card className={classes.logo}>
          <CardMedia>
            <img src={NorthernPeriferyLogo} className={classes.image} />
          </CardMedia>
        </Card>
        <Card className={classes.logo}>
          <CardMedia>
            <img src={PathfinderLogo} className={classes.image} />
          </CardMedia>
        </Card>
        <Box component="div" className={classes.filler} />
        {isAdmin && <IconButton
          onClick={() => {
            redirectTo("/admin");
          }}
          color="inherit"
          className={classes.navButton}
        >
          <VpnKeyIcon />
        </IconButton>
        }
        <IconButton
          onClick={() => {
            redirectTo("");
          }}
          color="inherit"
          className={classes.navButton}
        >
          <Home />
        </IconButton>
        <Button
          onClick={() => {
            redirectTo("/about");
          }}
          color="inherit"
          className={classes.navButton}
        >
          About
        </Button>
        <Button
          onClick={() => {
            redirectTo("/instructions");
          }}
          color="inherit"
          className={classes.navButton}
        >
          Instructions
        </Button>
        <Button
          onClick={() => {
            redirectTo("/design");
          }}
          color="inherit"
          className={classes.navButton}
        >
          Design
        </Button>
        {isAuthenticated && (
          <div>
            <IconButton
              disabled={loading}
              className={classes.navButton}
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  redirectTo("/buildings");
                }}
              >
                Designed buildings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  redirectTo("/feedback");
                }}
              >
                Give feedback
              </MenuItem>
              <MenuItem
                onClick={() => {
                    if (!loading) {
                      logout({ returnTo: process.env.REACT_APP_AUTH_RETURN_URL })
                    }
                  }
                }
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
        {!isAuthenticated && (
          <Button
            className={classes.navButton}
            disabled={loading}
            onClick={() => {
              if (!loading) {
                loginWithRedirect({});
              }
            }}
            color="inherit"
          >
            Login
          </Button>
        )}
      </Toolbar>

      <Snackbar
        open={logoutAlert}
        autoHideDuration={6000}
        onClose={_logoutAlertClose}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert onClose={_logoutAlertClose} severity="info">
          Successfully logged out.
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default NavigationBar;
