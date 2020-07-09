import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth0 } from "../../../../utils/react-auth0-spa";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  createCommentButton: {
    marginBottom: theme.spacing(2),
  },
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(0),
  },
  headerText: {
    fontSizeAdjust: 0.4,
  },
  textArea: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
  radioForm: {
    marginLeft: theme.spacing(1),
    paddingRight: theme.spacing(0),
    display: "block",
  },
  switch: {
    marginLeft: theme.spacing(0),
  },
  switchText: {
    display: "inline-block",
    marginLeft: theme.spacing(0),
  },
  explanationText: {
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
  submitCommentButton: {
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(2),
    display: "block",
  },
}));

const CommentCreationForm = (props) => {
  const classes = useStyles();

  const { user } = useAuth0();

  const [radioValue, setRadioValue] = useState("none");
  const [commentTextValue, setCommentTextValue] = useState("");
  const [switchState, setSwitchState] = useState(false);

  const _handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const _handleTextFieldChange = (event) => {
    if (props.handleComment) {
      props.handleComment(event);
    }
    setCommentTextValue(event.target.value);
  };

  const _handleSwitchChange = (event) => {
    setSwitchState(switchState ? false : true);
  };

  const _handleSubmit = () => {
    console.log("submitted");
    const comment = {
      commentText: commentTextValue,
      sentiment: radioValue,
    };
    console.log(comment);
  };

  return (
    <React.Fragment className={classes.root}>
      <TextField
        id="comment-text-field"
        label="Comment text"
        multiline
        fullWidth
        rows={4}
        variant="outlined"
        onChange={_handleTextFieldChange}
        className={classes.textArea}
      />
      <FormControl className={classes.radioForm}>
        <FormLabel>Sentiment</FormLabel>
        <RadioGroup
          row
          aria-label="sentiment"
          name="sentiment"
          value={radioValue}
          onChange={_handleRadioChange}
        >
          <FormControlLabel value="none" control={<Radio />} label="None" />
          <FormControlLabel
            value="positive"
            control={<Radio />}
            label={<SentimentSatisfiedAltIcon style={{ color: green[500] }} />}
          />
          <FormControlLabel
            value="neutral"
            control={<Radio />}
            label={<SentimentSatisfiedIcon />}
          />
          <FormControlLabel
            value="negative"
            control={<Radio />}
            label={
              <SentimentVeryDissatisfiedIcon
                style={{ fontSize: 26 }}
                color="secondary"
              />
            }
          />
        </RadioGroup>
      </FormControl>
      <Switch
        checked={switchState}
        onChange={_handleSwitchChange}
        color="primary"
        name="switch"
        className={classes.switch}
        inputProps={{ "aria-label": "display-username-checkbox" }}
      />
      <Typography className={classes.switchText}>
        Display your username in your comment
      </Typography>
      <Typography className={classes.explanationText}>
        Your username will be displayed as{" "}
        <strong>{switchState ? user.nickname : "Anonymous user"}</strong>
      </Typography>
      {/* <Button
        className={classes.submitCommentButton}
        variant="contained"
        color="primary"
        onClick={_handleSubmit}
      >
        Submit 
      </Button> */}
    </React.Fragment>
  );
};

export default CommentCreationForm;
