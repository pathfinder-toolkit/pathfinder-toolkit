import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { green } from '@material-ui/core/colors';

import CommentUserActions from "./CommentUserActions";

import { useAuth0 } from "../../../utils/react-auth0-spa"



const Comment = (props) => {
    const classes = props.classes;

    const [ deleted, setDeleted ] = useState(false);

    const {
        user
    } = useAuth0();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const hideContent = () => {
        setDeleted(true);
    }

    if (deleted) {
        return <ListItem alignItems="flex-start">
            <ListItemText
            primary= {
                <Typography className={classes.commentText}>
                    Comment deleted
                </Typography>
                }
            />
        </ListItem>
    }

    return <ListItem alignItems="flex-start">
        <ListItemIcon>
            {props.comment.sentiment === 'positive' && <SentimentSatisfiedAltIcon style={ {fontSize: 26, color: green[500]} } />}
            {props.comment.sentiment === 'neutral' && <SentimentSatisfiedIcon style={ {fontSize: 26} } />}
            {props.comment.sentiment === 'negative' && <SentimentVeryDissatisfiedIcon style={ {fontSize: 26} } color="secondary" />}
        </ListItemIcon>
        <ListItemText
          primary= {
            <Typography className={classes.commentHeader}>
                {props.comment.commentSubject} {props.comment.commentSecondarySubject && (
                    <React.Fragment> <KeyboardArrowRightIcon fontSize="inherit" /> {props.comment.commentSecondarySubject}</React.Fragment>
                )}
            </Typography>
            }
          secondary={
            <React.Fragment>
                <Typography className={classes.commentText}>
                    <strong>{props.comment.author ? (props["comment"]["author"]) : ("Anonymous user") }</strong> - {props["comment"]["commentText"]}
                </Typography>
            </React.Fragment>
            }
        />
        {user && !props.actionsDisabled && (
            <CommentUserActions
            comment={props.comment}
            classes={classes}
            onDelete={hideContent}
            />
        )}
        </ListItem>
}

export default Comment;