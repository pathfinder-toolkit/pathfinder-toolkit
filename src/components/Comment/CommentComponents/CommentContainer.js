import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button'
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

import { useBackend } from "../../../utils/BackendProvider";

import Comments from "./Comments.js";

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    commentHeader: {
        fontSizeAdjust: 0.6,
        lineHeight:'180%'
    },
    commentText: {
        fontSizeAdjust: 0.5,
        lineHeight: 1.2
    },
    displayText: {
        display: "inline",
        marginLeft: theme.spacing(1),
        maxWidth: 320
    },
    commentSubjectArrow: {
        fontSizeAdjust: 0.2,
    }
  }));

const CommentContainer = (props) => {
    const classes = useStyles();

    const [comments, setComments] = useState(null);

    const [switchState, setSwitchState] = useState(true);

    const [loading, setLoading] = useState(false);

    const { requestComments } = useBackend();
    
    const _handleSwitchChange = (event) => {
        setSwitchState(switchState ? false : true);
    };

    const fetchComments = async () => {
        setLoading(true);
        const data = await requestComments(props.subject);
        console.log(data)
        setComments(data);
        setLoading(false);
    }

    return <Paper className={classes.root}>
        {comments && (comments.length > 0) && (<React.Fragment>
                <Switch
                checked={switchState}
                onChange={_handleSwitchChange}
                color="primary"
                name="switch"
                inputProps={{ 'aria-label': 'show-comments-checkbox' }}
                />
                <Typography className={classes.displayText}>{switchState ? "Hide comments" : "Show comments"}</Typography>
                {switchState && <Comments comments={comments} classes={classes} />}
            </React.Fragment>
        )}
        {comments && (comments.length == 0) && (
            <React.Fragment>
                <Typography className={classes.displayText}>No comments found, add one below</Typography>
            </React.Fragment>
        )}
        {!comments && (
            <React.Fragment>
                {loading ? (
                    <Typography className={classes.displayText}>Loading</Typography> 
                ) : (
                    <Button onClick={fetchComments}>Show comments</Button>
                )}
            </React.Fragment>

        )}
    </Paper>
}

export default CommentContainer;