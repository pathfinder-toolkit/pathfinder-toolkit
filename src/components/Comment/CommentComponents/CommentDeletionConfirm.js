import React, { useState } from "react";
import Modal from '@material-ui/core/Modal';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useBackend } from "../../../utils/BackendProvider";

const CommentDeletionConfirm = (props) => {
    const classes = props.classes

    const handleClose = () => {
        if (status.success) {
            props.onDelete();
        }
        props.onClose();
    }

    const [ status, setStatus ] = useState({
        pending: false,
        resolved: false,
        success: false
    });

    const {
        deleteCommentAsAdmin
    } = useBackend();

    const handleConfirm = async () => {
        setStatus((prev) => {
            return {
                ...prev,
                pending: true
            }
        });
        const idComment = props.comment.idComment;
        const response = await deleteCommentAsAdmin(idComment);
        const newStatus = {
            pending: false,
            resolved: true
        }
        if (response.status === 200) {
            newStatus.success = true;
        }
        setStatus((prev) => {
            return {
                ...prev,
                ...newStatus
            }
        })
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
                                <Typography variant="h5">
                                    Confirm deletion?
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
                {status.resolved && (
                    <Grid container direction="column" alignItems="center" justify="flex-end" className={classes.modalContent} fullWidth>
                        <Grid item xs={12} className={classes.modalItem} fullWidth>
                            <Typography  variant="p">
                                {status.success ? (
                                    "Experience deleted"
                                ) : (
                                    "Deletion failed to process, try again later"
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
                {status.pending && (
                    <Grid container direction="column" alignItems="center" justify="flex-end" className={classes.modalContent} fullWidth>
                        <Grid item xs={12} className={classes.modalItem} fullWidth>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                )}
                {!(status.pending || status.resolved) && (
                    <Grid container direction="column" alignItems="center" justify="flex-end" className={classes.modalContent} fullWidth>
                        <Grid item xs={12} className={classes.modalItem} fullWidth>
                            <Typography  variant="p">
                                Selected experience:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.modalItem} fullWidth>
                            <TextField
                            multiline
                            disabled
                            fullWidth
                            value={props.comment.commentText}
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.modalItem}  fullWidth>
                            <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleConfirm}
                            size="large"
                            >
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Card>
        </Modal>
    )
}

export default CommentDeletionConfirm;