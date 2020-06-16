import React, {useEffect} from "react";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';



const SuggestionAlert = (props) => {
    const classes = props.classes;

    const checkPriority = (priority) => {
        let severity, alertTitle;
        if (priority === 0) {
            severity = "success";
            alertTitle = "No improvement suggestion";
        } else if (priority> 0 && priority < 20) {
            severity = "info";
            alertTitle = "Low priority suggestion";
        } else if (priority >= 20 && priority < 50) {
            alertTitle = "Medium priority suggestion";
            severity = "warning";
        } else {
            alertTitle = "High priority suggestion";
            severity = "error";
        }
        return [severity, alertTitle];
    }

    const [severity, alertTitle] = checkPriority(props.suggestion.priority);

    return <Alert severity={severity} icon={false} className={classes.suggestionAlert}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {props.suggestion.suggestionText}
    </Alert>
}

export default SuggestionAlert;