import React from "react";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';



const SuggestionAlert = (props) => {
    const classes = props.classes;

    const checkPriority = (priority) => {
        let severity;
        if (priority === 0) {
            severity = "success";
        } else if (priority> 0 && priority < 20) {
            severity = "info";
        } else if (priority >= 20 && priority < 50) {
            severity = "warning";
        } else {
            severity = "error";
        }
        return severity;
    }

    const severity = checkPriority(props.suggestion.priority);

    return <Alert severity={severity} icon={false} className={classes.suggestionAlert}>
        <AlertTitle>{props.suggestion.suggestionSubject} {props.suggestion.suggestionSecondarySubject && (
                        <React.Fragment>
                            <KeyboardArrowRightIcon fontSize="inherit" /> {props.suggestion.suggestionSecondarySubject}
                        </React.Fragment>
                    )}
        </AlertTitle>
        {props.suggestion.suggestionText}
    </Alert>
}

export default SuggestionAlert;