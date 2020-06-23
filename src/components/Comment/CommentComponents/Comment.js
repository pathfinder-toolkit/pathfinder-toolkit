import React from "react";
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { green } from '@material-ui/core/colors';



const Comment = (props) => {
    const classes = props.classes;

    return <ListItem alignItems="flex-start">
        <ListItemIcon>
            {props.comment.sentiment === 'positive' && <SentimentSatisfiedAltIcon style={ {fontSize: 26, color: green[500]} } />}
            {props.comment.sentiment === 'neutral' && <SentimentSatisfiedIcon style={ {fontSize: 26} } />}
            {props.comment.sentiment === 'negative' && <SentimentVeryDissatisfiedIcon style={ {fontSize: 26} } color="secondary" />}
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