import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    createCommentButton: {
        marginBottom: theme.spacing(2)
    },
    root: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
    }
  }));

const CommentCreationContainer = () => {
    const classes = useStyles();

    return <React.Fragment>
        <Button 
        size="small" 
        className={classes.createCommentButton} 
        variant="outlined" 
        >
            Create comment
        </Button>
        <Paper className={classes.root}>
        </Paper>
    </React.Fragment>
}

export default CommentCreationContainer;