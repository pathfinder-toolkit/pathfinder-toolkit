import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

import CommentCreationForm from "./CommentCreationForm";

const useStyles = makeStyles((theme) => ({
    createCommentButton: {
        marginBottom: theme.spacing(2),
    },
    root: {
        marginBottom: theme.spacing(4),
        marginRight: theme.spacing(2),
    },
    headerText: {
        fontSizeAdjust: 0.4,
    },
    textArea: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
        paddingRight: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    radioForm: {
        marginLeft: theme.spacing(2),
        paddingRight: theme.spacing(4),
        display:"block",
    },
    switch: {
        marginLeft:theme.spacing(1),
    },
    switchText: {
        display: "inline-block",
        marginLeft: theme.spacing(1)
    },
    explanationText: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    submitCommentButton: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display:"block",
    },
    progressSpinner: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
  }));

const CommentCreationContainer = (props) => {
    const classes = useStyles();
    const [showForm, setShowForm] = useState(false);

    const _handleToggle = () => {
        setShowForm( (showForm) ? false : true );
    }

    return <React.Fragment>
        {!showForm && (<Button 
            size="small" 
            className={classes.createCommentButton} 
            variant="outlined"
            onClick = {_handleToggle}
            >
                Create experience
            </Button>
        )}
        {showForm && <CommentCreationForm subject={props.subject} classes={classes} onClose={_handleToggle}/>}
    </React.Fragment>
}

export default CommentCreationContainer;