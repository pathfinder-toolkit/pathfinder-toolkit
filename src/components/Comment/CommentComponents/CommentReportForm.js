import React, { useState } from "react";
import Modal from '@material-ui/core/Modal';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

import { useBackend } from "../../../utils/BackendProvider";

const CommentReportForm = (props) => {
    const classes = props.classes;

    const [ status, setStatus ] = useState({
        pending: false,
        resolved: false,
        success: false
    });

    const [ reportReason, setReportReason ] = useState("");

    const {
        submitReportOnComment
    } = useBackend();

    const handleClose = () => {
        props.onClose();
    }

    const handleChange = (e) => {
        setReportReason(e.target.value);
    }

    const handleSubmit = async () => {
        console.log("Report submitted");
        setStatus((prev) => {
            return {
                ...prev,
                pending: true
            }
        });
        const idComment = props.comment.idComment;
        const requestBody = {
            reason: reportReason
        };
        const response = await submitReportOnComment(idComment, requestBody);
        console.log(response);
        const newStatus = {
            pending: false,
            resolved: true
        }
        if (response.status === 201) {
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
                                <Typography variant="h6">
                                    Submit report
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
                                    "Report successfully sent, it will be reviewed by an administrator"
                                ) : (
                                    "Unexpected error occurred, try reporting again later"
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
                                Reported user experience:
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
                        <Grid item xs={12} className={classes.modalItem} fullWidth>
                            <Typography  variant="p">
                                Please explain the reason for reporting the experience above:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.modalItem} fullWidth>
                            <TextField
                            multiline
                            fullWidth
                            variant="outlined"
                            value={reportReason}
                            onChange={handleChange}
                            label="Reason for report"
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.modalItem} fullWidth>
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            >
                                Submit report
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Card>
        </Modal>
    )
}

export default CommentReportForm;