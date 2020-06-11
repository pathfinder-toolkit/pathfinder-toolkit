import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const CategoryItem = (props) => {
    return <Grid container>
        <Grid item xs={6}>
            <Typography variant="h6">{props.identifier}: {props.value}</Typography>
        </Grid>
        <Grid item xs={6}>
        </Grid>
    </Grid>
}

export default CategoryItem;