import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AdminNotifications from "./AdminNotifications";

const AdminDashboard = (props) => {
    const classes = props.style;

    return <React.Fragment>
            <Typography variant="h4" component="h4" className={classes.header}>Admin dashboard</Typography>
            <Grid container fullWidth direction="row">
                <Grid item xs={9}>
                    {/* TODO Dashboard content */}

                </Grid>

                <Grid item xs={3}>
                    <AdminNotifications
                    classes={classes} />
                </Grid>
            </Grid>
            
        </React.Fragment>
}

export default AdminDashboard;