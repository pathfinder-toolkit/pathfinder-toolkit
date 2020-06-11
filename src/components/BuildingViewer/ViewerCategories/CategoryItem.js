import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const CategoryItem = (props) => {
    const classes = props.classes;

    return <Grid container>
        <Grid item xs={4}>
            <Typography variant="h6">{props.identifier}: {props.value}</Typography>
        </Grid>
        <Grid item xs={4}>
            {props.suggestions && props.suggestions.map((suggestion) => {
                return <Alert severity="error" icon={false} className={classes.suggestionAlert}>
                <AlertTitle>High priority suggestion</AlertTitle>
                {suggestion.suggestionText}
              </Alert>
            })}
        </Grid>
    </Grid>
}

export default CategoryItem;