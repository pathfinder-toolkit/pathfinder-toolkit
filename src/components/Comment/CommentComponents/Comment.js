import React from "react";
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';



const Comment = (props) => {
    return <ListItem alignItems="flex-start">
        <ListItemIcon>
            <SentimentSatisfiedAltIcon />
        </ListItemIcon>
        <ListItemText
          primary= {
            <Typography>
                {props.comment.author ? (props["comment"]["author"]) : ("Anonymous user") }
            </Typography>
            }
          secondary={
            <React.Fragment>
                <Typography>
                {props["comment"]["commentText"]}
                </Typography>
            </React.Fragment>
          }
        />
        </ListItem>
}

export default Comment;