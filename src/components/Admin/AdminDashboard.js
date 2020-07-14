import React from "react";
import Typography from "@material-ui/core/Typography";

const AdminDashboard = (props) => {
    const classes = props.style;
    return <Typography variant="h4" component="h4" className={classes.header}>Admin dashboard</Typography>
}

export default AdminDashboard;