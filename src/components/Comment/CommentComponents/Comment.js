import React from "react";

const Comment = (props) => {
    return <React.Fragment>
        <p>{props.comment.author}</p>
        <p>{props.comment.date}</p>
        <p>{props.comment.commentText}</p>
        </React.Fragment>
}

export default Comment;