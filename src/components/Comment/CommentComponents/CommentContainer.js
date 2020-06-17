import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

import Comments from "./Comments.js";

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    commentAuthor: {
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
    }
  }));

const CommentContainer = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({
        checked: true,
      });
    
      const _handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    

    return <Paper className={classes.root}>
        {props.comments.length > 0 && (<React.Fragment>
                <Switch
                checked={state.switch}
                onChange={_handleSwitchChange}
                color="primary"
                name="switch"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Typography className={classes.displayText}>{state.switch ? "Hide comments" : "Show comments"}</Typography>
                {state.switch && <Comments comments={props.comments} classes={classes} />}
            </React.Fragment>
         )}
        {props.comments.length == 0 && (
            <Typography className={classes.displayText}>No comments found, add one below</Typography>
        )}
    </Paper>
}

export default CommentContainer;