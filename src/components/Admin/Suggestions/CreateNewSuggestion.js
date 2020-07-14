import React from "react";
import Typography from "@material-ui/core/Typography";

const CreateNewSuggestion = (props) => {
    const classes = props.style;

    return <Typography variant="h4" component="h4" className={classes.header}>Create a new suggestion</Typography>
}

export default CreateNewSuggestion;