import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';

import CommentCreationForm from "./CommentCreationForm";

const useStyles = makeStyles((theme) => ({
    createCommentButton: {
        marginBottom: theme.spacing(2)
    },
    root: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    textArea: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        paddingRight: theme.spacing(4),
        marginBottom: theme.spacing(1),
    },
    radioForm: {
        marginLeft: theme.spacing(2),
        paddingRight: theme.spacing(4),
        marginBottom: theme.spacing(1),
    }
  }));

const CommentCreationContainer = () => {
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
                Create comment
            </Button>
        )}
        {showForm && <CommentCreationForm classes={classes} />}
    </React.Fragment>
}

export default CommentCreationContainer;