import React, { useState, useEffect } from "react";
import { CircularProgress, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useEditor } from "../../../utils/EditorProvider";
import Comment from "../../Comment/CommentComponents/Comment";
import InfoBox from "./InfoBox";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  comment: {
    marginBottom: theme.spacing(1),
  },
  commentHeader: {
    fontSizeAdjust: 0.6,
    lineHeight: "180%",
  },
  commentText: {
    fontSizeAdjust: 0.5,
    lineHeight: 1.2,
  },
  displayText: {
    display: "inline",
    marginLeft: theme.spacing(1),
    maxWidth: 320,
  },
  commentSubjectArrow: {
    fontSizeAdjust: 0.2,
  },
}));

const CommentContainer = (props) => {
  const classes = useStyles();

  const [showInfo, setShowInfo] = useState(true);
  const { comments, commentsLoading } = useEditor();

  useEffect(() => {
    if (!commentsLoading) {
      setShowInfo(false);
    }
  }, [commentsLoading]);

  return (
    <React.Fragment>
      {commentsLoading ? (
        showInfo ? (
          <InfoBox />
        ) : (
          <CircularProgress />
        )
      ) : (
        <React.Fragment>
          {comments &&
            comments.map((comment, key) => {
              return (
                <Paper className={classes.comment}>
                  <Comment comment={comment} classes={classes} key={key} />
                </Paper>
              );
            })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CommentContainer;
