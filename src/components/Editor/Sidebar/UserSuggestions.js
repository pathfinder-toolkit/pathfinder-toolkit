import React, { useState, useEffect } from "react";
import { CircularProgress, Paper, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useEditor } from "../../../utils/EditorProvider";
import Comment from "../../Comment/CommentComponents/Comment";
import InfoBox from "./InfoBox";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  commentsRoot: {
    padding: theme.spacing(1),
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
  infoBox: {
    marginTop: theme.spacing(5),
  },
  suggestionList: {
    overflow: "auto",
    position: "relative",
    height: "75vh",
    padding: "5px",
  },
}));

const UserSuggestions = (props) => {
  const classes = useStyles();

  const { commentsLoading } = useEditor();
  const [showInfo, setShowInfo] = useState(true);

  const filteredSubjects = props.filteredSubjects;
  const comments = props.userSuggestions;

  useEffect(() => {
    if (!commentsLoading) {
      setShowInfo(false);
    }
  }, [commentsLoading]);

  return (
    <React.Fragment>
      {commentsLoading ? (
        showInfo ? (
          <div className={classes.infoBox}>
            <InfoBox />
          </div>
        ) : (
          <CircularProgress />
        )
      ) : (
        <React.Fragment>
          <List className={classes.suggestionList}>
            <div className={classes.commentsRoot}>
              {comments &&
                comments.map((comment, key) => {
                  if (filteredSubjects.includes(comment.commentSubject)) {
                    return;
                  }

                  return (
                    <Paper className={classes.comment}>
                      <Comment comment={comment} classes={classes} key={key} />
                    </Paper>
                  );
                })}
            </div>
          </List>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UserSuggestions;
