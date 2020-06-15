import React from "react";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Comment from "./Comment.js";

const Comments = (props) => {
    const classes = props.classes;
    
    return <React.Fragment>
        <List>
            {props.comments && props.comments.length > 0 ? (
                    props.comments.map((comment, key) => {
                        return (
                            <React.Fragment>
                                <Comment comment={comment} key={key} classes={classes} />
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        )
                    })
                ) : (
                    <p>No comments</p>
                )
            }
        </List>
        </React.Fragment>
}

export default Comments;