import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const CommentCreationForm = (props) => {
    const classes = props.classes;

    return <Paper className={classes.root}>
        <TextField
            id="comment-text-field"
            label="Comment text"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            className={classes.textArea}
        />
        <Grid container>
            <Grid item xs={3}>
                <p>Testi</p>
            </Grid>
            <Grid item xs={3}>
                <p>Testi</p>
            </Grid>
            <Grid item xs={3}>
                <p>Testi</p>
            </Grid>
            <Grid item xs={3}>
                <p>Testi</p>
            </Grid>
        </Grid>
    </Paper>
}

export default CommentCreationForm;