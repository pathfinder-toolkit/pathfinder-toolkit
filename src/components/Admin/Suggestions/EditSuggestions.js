import React from "react";
import Typography from "@material-ui/core/Typography";

const EditSuggestions = (props) => {
    const classes = props.style;

    return <Typography variant="h4" component="h4" className={classes.header}>Edit existing suggestions</Typography>
}

export default EditSuggestions;