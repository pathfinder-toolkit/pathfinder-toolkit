import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import SuggestionAlert from "../../reusable/SuggestionAlert.js";
import CommentField from "../../Comment/CommentField.js";

const CategoryItemWithHistory = (props) => {
    const classes = props.classes;
    return <TimelineItem> 
        <TimelineOppositeContent className={classes.timelineLeftColumn}>
            <Typography color="textSecondary">{props.item.usageStartYear}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
        <Grid container>
            <Grid item xs={3}>
            <Typography className={classes.timelineItemText}variant="h6">{props.item.value}</Typography>
            </Grid>
            <Grid item xs={5}>
                {props.item.suggestions && props.item.suggestions.map((suggestion, key) => {
                    return <SuggestionAlert suggestion={suggestion} classes={classes} key={key} />
                })}
            </Grid>
            <Grid item xs={4}>
                {props.item.hasSuggestions && <CommentField subject={props.subject}/>}
            </Grid>
            </Grid>
        </TimelineContent>
    </TimelineItem>
}

export default CategoryItemWithHistory;