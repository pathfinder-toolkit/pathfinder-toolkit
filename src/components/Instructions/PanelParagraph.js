import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const PanelParagraph = (props) => {
    const classes = props.classes;
    
    return <Grid item>
        <Typography variant="p" className={classes.instructionText}>
            {props.children}
        </Typography>
    </Grid>
}

export default PanelParagraph;