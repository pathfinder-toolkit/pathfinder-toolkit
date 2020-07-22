import React from "react";
import Typography from "@material-ui/core/Typography";

const UpdateRegionOptions = (props) => {
    const classes = props.style;

    return <React.Fragment>
        <Typography variant="h4" component="h4" className={classes.header}>Update region options</Typography>
    </React.Fragment>
}

export default UpdateRegionOptions;