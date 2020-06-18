import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

import {useAuth0} from "./../../../utils/react-auth0-spa";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';

const CommentCreationForm = (props) => {
    const classes = props.classes;

    const { user } = useAuth0();

    const [radioValue, setRadioValue] = useState('none');
    const [switchState, setSwitchState] = useState(false);

    const _handleRadioChange = (event) => {
        console.log(user);
        setRadioValue(event.target.value);
    };

    const _handleSwitchChange = (event) => {
        setSwitchState(switchState ? false : true)
    };

    return <Card className={classes.root}>
        <CardHeader
        className={classes.headerText}
        action={
          <IconButton onClick={props.onClose} aria-label="settings">
            <CloseIcon />
          </IconButton>
        }
        title="Create your comment below"
      />
        <Typography  ></Typography>
        <TextField
            id="comment-text-field"
            label="Comment text"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            className={classes.textArea}
        />
        <FormControl className={classes.radioForm} >
            <FormLabel>Select sentiment</FormLabel>
            <RadioGroup row aria-label="sentiment" name="sentiment" value={radioValue} onChange={_handleRadioChange}>
                <FormControlLabel
                value="none"
                control={<Radio />}
                label="None"
                />
                <FormControlLabel
                value="positive"
                control={<Radio />}
                label={<SentimentSatisfiedAltIcon
                style={ { color: green[500]} } />}
                />
                <FormControlLabel
                value="neutral"
                control={<Radio />}
                label={<SentimentSatisfiedIcon />}
                />
                <FormControlLabel
                value="negative"
                control={<Radio />}
                label={<SentimentVeryDissatisfiedIcon style={ {fontSize: 26} } color="secondary" />}
                />
            </RadioGroup>
        </FormControl>
        <Switch
        checked={switchState}
        onChange={_handleSwitchChange}
        color="primary"
        name="switch"
        inputProps={{ 'aria-label': 'display-username-checkbox' }}
        />
        <Typography className={classes.displayText}>Display your username in your comment</Typography>
        <Typography className={classes.displayText}>Your username will be displayed as <strong>{switchState ? user.nickname : "Anonymous user"}</strong></Typography>
        <Button 
        className={classes.submitCommentButton} 
        variant="contained"
        color="primary"
        >
            Submit
        </Button>
    </Card>
}

export default CommentCreationForm;