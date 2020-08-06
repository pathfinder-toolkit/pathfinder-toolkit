import React from "react";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Comment from "./Comment.js";

const Comments = (props) => {
    const classes = props.classes;
    
    return <React.Fragment>
        <List>
        {props.comments.map((comment) => {
            return (
                <React.Fragment key={comment.idComment}>
                    <Comment comment={comment} classes={classes} />
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            )
        })}
        </List>
        {props.children}
        </React.Fragment>
}

export default Comments;