import React from "react";
import Typography from "@material-ui/core/Typography";

const DeleteSuggestions = (props) => {
    const classes = props.style;

    return <Typography variant="h4" component="h4" className={classes.header}>Delete suggestions</Typography>
}

export default DeleteSuggestions;