import React from "react";
import Paper from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const DetailsCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.details).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4">Building details</Typography>
        
        {containsCategoryItem("name") && (<Grid container>
                <Grid item xs={6}>
                    <Typography variant="h6">Name: {props.details.name.value}</Typography>
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
        )}
    </Paper>
}

export default DetailsCategory;