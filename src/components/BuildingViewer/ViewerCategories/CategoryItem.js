import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import SuggestionAlert from "./SuggestionAlert.js";

const CategoryItem = (props) => {
    const classes = props.classes;

    return <Grid container>
        <Grid item xs={4}>
            <Typography variant="h6">{props.identifier}: {props.value}</Typography>
        </Grid>
        <Grid item xs={4}>
            {props.suggestions && props.suggestions.map((suggestion, key) => {
                return <SuggestionAlert suggestion={suggestion} classes={classes} key={key} />
            })}
        </Grid>
    </Grid>
}

export default CategoryItem;