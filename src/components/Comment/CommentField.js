import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

import CommentContainer from "./CommentComponents/CommentContainer.js"
import CommentCreationContainer from "./CommentComponents/CommentCreationContainer"



const CommentField = (props) => {
    

    return <React.Fragment>
        <CommentContainer comments={props.comments} />
        <CommentCreationContainer />
    </React.Fragment>
}

export default CommentField;