import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button'
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
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
        lineHeight:'180%',
        maxWidth: "92%"
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
    },
    commentUserAction: {
        top: "20%",
        right: "1%"
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
    formRoot: {
        minHeight: "20vh",
        minWidth: "40vw",
        alignItems: "center",
        justifyContent: "flex-end",
        cursor: "auto",
    },
    modalContent: {
        minHeight: "20vh",
        marginBottom: theme.spacing(2),
        flexGrow: 1
    },
    modalItem: {
        margin: theme.spacing(1),
        width: "90%"
    }
  }));

const CommentContainer = (props) => {
    const classes = useStyles();

    const [comments, setComments] = useState(null);
    const [switchState, setSwitchState] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({page: 0, perPage: 3});
    const { requestComments } = useBackend();
    
    const _handleSwitchChange = (event) => {
        setSwitchState(switchState ? false : true);
    };

    const fetchComments = async () => {
        setLoading(true);
        const response = await requestComments(props.subject, pagination.page + 1, pagination.perPage);
        console.log(response)
        if (response.status === 200) {
            setPagination((prev) => {
                return {
                    ...prev,
                    page: response.data.page,
                    maxPages: response.data.maxPages
                }
            });
            if (comments) {
                setComments((prev) => {
                    return [
                        ...prev,
                        ...response.data.comments
                    ]
                });
            } else {
                setComments(response.data.comments);
            }
        }
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
                <Typography className={classes.displayText}>{switchState ? "Hide user experiences" : "Show user experiences"}</Typography>
                {switchState && (
                <Comments 
                    comments={comments}
                    classes={classes}
                >
                    {(pagination.page < pagination.maxPages) && (
                        <Button onClick={fetchComments}>Show more user experiences</Button>
                    )}
                    {loading && (
                        <CircularProgress />
                    )}
                </Comments>
                )}
            </React.Fragment>
        )}
        {comments && (comments.length == 0) && (
            <React.Fragment>
                <Typography className={classes.displayText}>No experiences found, add one below</Typography>
            </React.Fragment>
        )}
        {!comments && (
            <React.Fragment>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Button onClick={fetchComments}>Show user experiences</Button>
                )}
            </React.Fragment>
        )}
    </Paper>
}

export default CommentContainer;