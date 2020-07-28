import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CommentReportForm from "./CommentReportForm";

const CommentUserActions = (props) => {
    const classes = props.classes;

    const [ anchorEl, setAnchorEl ] = useState(null);

    const [ showReportForm, setShowReportForm ] = useState(false);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleReport = () => {
        setAnchorEl(null);
        setShowReportForm(true);
    }

    const handleCloseReportForm = () => {
        setShowReportForm(false);
    }

    return <React.Fragment>
        <ClickAwayListener onClickAway={handleClose}>
            <ListItemSecondaryAction className={classes.commentUserAction} >
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                id="user-action-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                    <MenuItem onClick={handleReport}>Report comment</MenuItem>
                </Menu>
                
            </ListItemSecondaryAction>
        </ClickAwayListener>
        {showReportForm && (
            <CommentReportForm
            show={showReportForm}
            onClose={handleCloseReportForm}
            classes={classes}
            comment={props.comment}
            />
        )}
    </React.Fragment>
}

export default CommentUserActions;