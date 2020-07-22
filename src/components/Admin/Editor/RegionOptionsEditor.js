import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

const RegionOptionsEditor = (props) => {
    const classes = props.classes;

    return <React.Fragment>
        <Grid container item xs={8} direction="row">
            <Grid item xs={6}>
                <Typography variant="h6" component="h6" className={classes.subHeader}>Current options</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" component="h6" className={classes.subHeader}>Modify options here</Typography>
            </Grid>
        </Grid>
    </React.Fragment>
}

export default RegionOptionsEditor;