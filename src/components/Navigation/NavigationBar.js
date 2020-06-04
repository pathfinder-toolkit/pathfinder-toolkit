import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

import { useBackend } from "../../utils/FakeBackend";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));

const NavigationBar = () => {
    const { getUser } = useBackend();
    const [user] = useState(getUser);

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleProfileMenuClose = (event) => {
        console.log(anchorEl);
        setAnchorEl(null);
      };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

    return <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
                Front Page
            </Typography>
            {user && (
                <div>
                    <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit" >
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
                        <MenuItem onClick={handleProfileMenuClose}>Designed buildings</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                    </Menu>
                </div>
                
                
            )}
        </Toolbar>
    </AppBar>
}

export default NavigationBar;