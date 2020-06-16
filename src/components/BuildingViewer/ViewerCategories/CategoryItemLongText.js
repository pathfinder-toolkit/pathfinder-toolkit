import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const CategoryItemLongText = (props) => {
    const classes = props.classes;

    return <Grid container>
        <Grid item xs={8}>
            <Typography className={classes.categoryItemText}variant="h6">{props.item.propertyName}:</Typography>
            <Typography className={classes.categoryItemLongText}variant="p">{props.item.value}</Typography>
        </Grid>
    </Grid>
}

export default CategoryItemLongText;