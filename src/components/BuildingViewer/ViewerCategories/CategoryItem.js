import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SuggestionAlert from "../../reusable/SuggestionAlert.js";
import CommentField from "../../Comment/CommentField.js";

const CategoryItem = (props) => {
    const classes = props.classes;

    return <Grid container>
        <Grid item xs={4}>
            <Typography className={classes.categoryItemText}variant="h6">{props.item.propertyName}: {typeof props.item.value === "boolean" ? props.item.value.toString() : props.item.value}</Typography>
        </Grid>
        <Grid item xs={4}>
            {props.item.suggestions && props.item.suggestions.map((suggestion, key) => {
                return <SuggestionAlert suggestion={suggestion} classes={classes} key={key} />
            })}
        </Grid>
        <Grid item xs={4}>
            {props.item.comments && <CommentField comments={props.item.comments} />}
        </Grid>
    </Grid>
}

export default CategoryItem;