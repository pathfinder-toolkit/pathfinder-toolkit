import React from "react";

import Comment from "./Comment.js";

const Comments = (props) => {
    
    return <React.Fragment>
        {props.comments && props.comments.length > 0 ? (
                props.comments.map((comment, key) => {
                    return <Comment comment={comment} key={key} />
                })
            ) : (
                <p>No comments</p>
            )
        }
        </React.Fragment>
}

export default Comments;