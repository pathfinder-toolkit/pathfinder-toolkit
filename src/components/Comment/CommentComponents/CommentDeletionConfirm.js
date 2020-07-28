import React from "react";
import Modal from '@material-ui/core/Modal';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';

const CommentDeletionConfirm = (props) => {
    const classes = props.classes

    const handleClose = () => {
        props.onClose();
    }

    return (
        <Modal
        className={classes.modal}
        open={props.show}
        onClose={handleClose}
        >
            <Card outlined className={classes.formRoot}>
                <CardHeader
                    title={
                        <Grid container direction="column" alignItems="center" justify="center">
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Submit comment report
                                </Typography>
                            </Grid>
                        </Grid>
                        }
                    action={
                        <IconButton aria-label="close-modal" onClick={handleClose}>
                        <CloseIcon />
                        </IconButton>
                    }
                />
            </Card>
        </Modal>
    )
}

export default CommentDeletionConfirm;