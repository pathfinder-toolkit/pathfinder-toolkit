import React from "react";

import CommentContainer from "./CommentComponents/CommentContainer.js"
import CommentCreationContainer from "./CommentComponents/CommentCreationContainer"

import { useAuth0 } from "../../utils/react-auth0-spa";

const CommentField = (props) => {
    const { isAuthenticated } = useAuth0();
    return <React.Fragment>
        <CommentContainer subject={props.subject} />
        {isAuthenticated && (<CommentCreationContainer subject={props.subject} />)}
    </React.Fragment>
}

export default CommentField;