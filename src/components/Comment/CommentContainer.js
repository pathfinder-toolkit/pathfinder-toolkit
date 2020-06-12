import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.spacing(1),
    }
  }));

const CommentContainer = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);
    
    const _handleChange = (event, newValue) => {
        setTabValue(newValue);
    }

    return <Paper className={classes.root}>
        <Tabs
        value={tabValue}
        onChange={_handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        >
            <Tab label="Show comments" />
            <Tab label="Create comment" />
        </Tabs>
        {tabValue === 0 && (
            <p>Comments</p>
        )}
        {tabValue === 1 && (
            <p>Comment Creation Form</p>
        )}
    </Paper>
}

export default CommentContainer;