import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const CategoryItemNoSuggestions = (props) => {
    const classes = props.classes;

    return <Grid container item direction="column">
    <Typography className={classes.categoryItemText}variant="h6">{props.item.propertyName}: {props.item.value}</Typography>
    </Grid>
}

export default CategoryItemNoSuggestions;