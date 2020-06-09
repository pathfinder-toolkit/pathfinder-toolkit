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

import { useBackend } from "../../utils/FakeBackend";
import history from "../../utils/history";

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


const NavigationBar = () => {
  const { user, fakeLogout } = useBackend();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

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

  return (
    <AppBar position="static">
      <Toolbar className={classes.navbar}>
        <Typography variant="h6" className={classes.title}></Typography>
        <IconButton onClick={() => { redirectTo('') }} color="inherit" className={classes.navButton} >
          <Home />
        </IconButton>
        <Button onClick={() => { redirectTo('design') }} color="inherit" className={classes.navButton}>
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
              <MenuItem onClick={() => { redirectTo('buildings') }}>
                Designed buildings
              </MenuItem>
              <MenuItem onClick={fakeLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
        {!user && (
          <Button className={classes.navButton} onClick={() => { redirectTo('login') }} color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
