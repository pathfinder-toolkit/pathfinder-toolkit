import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { green } from '@material-ui/core/colors';

const CommentCreationForm = (props) => {
    const classes = props.classes;

    const [value, setValue] = React.useState('none');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return <Paper className={classes.root}>
        <Typography className={classes.headerText} >Create your comment below</Typography>
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
            <RadioGroup row aria-label="sentiment" name="gender1" value={value} onChange={handleChange}>
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
        
    </Paper>
}

export default CommentCreationForm;