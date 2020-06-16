import React from "react";
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';



const Comment = (props) => {
    const classes = props.classes;

    return <ListItem alignItems="flex-start">
        <ListItemIcon>
            <SentimentSatisfiedAltIcon />
        </ListItemIcon>
        <ListItemText
          primary= {
            <Typography className={classes.commentAuthor}>
                {props.comment.author ? (props["comment"]["author"]) : ("Anonymous user") }
            </Typography>
            }
          secondary={
            <React.Fragment>
                <Typography className={classes.commentText}>
                    {props["comment"]["commentText"]}
                </Typography>
            </React.Fragment>
            }
        />
        </ListItem>
}

export default Comment;