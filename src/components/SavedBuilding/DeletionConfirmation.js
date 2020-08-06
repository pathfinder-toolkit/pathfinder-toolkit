import React, {useState} from "react";
import Modal from '@material-ui/core/Modal';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useBackend } from "../../utils/BackendProvider";
import history from "../../utils/history";

const DeletionConfirmation = (props) => {
    const classes = props.classes;
    const [confirmationText, setConfirmationText] = useState("");

    const [ status, setStatus ] = useState({
        pending: false,
        resolved: false,
        success: false
    })

    const {
        deleteBuilding
    } = useBackend();
    

    const handleChange = (e) => {
        setConfirmationText(e.target.value);
    }

    const handleClose = () => {
        if (status.pending || status.resolved) {
            history.push("/buildings");
        }
        props.onHide();
    }

    const handleConfirm = async () => {
        setStatus((prev) => {
            return {...prev, pending: true}
        });
        const response = await deleteBuilding(props.slug);
        const newStatus = { pending: false, resolved: true }
        if (response.status === 200) {
            newStatus.success = true;
        }
        setStatus((prev) => {
            return {...prev, ...newStatus}
        })
    }

    return (
    <Modal
    className={classes.modal}
    open={props.show}
    onClose={handleClose}
    >
            <Card outlined className={classes.confirmationRoot}>
                <CardHeader
                title={
                    <Grid container direction="column" alignItems="center" justify="center">
                        <Grid item xs={12}>
                            <Typography variant="h6">
                            Are you sure you want to delete {props.slug} ?
                            </Typography>
                        </Grid>
                    </Grid>
                    }
                action={
                    <IconButton aria-label="settings" onClick={handleClose}>
                      <CloseIcon />
                    </IconButton>
                }
                />

                {status.resolved && (
                    <Grid container direction="column" alignItems="center" justify="flex-end" className={classes.confirmationContent}>
                        {status.success ? (
                            <React.Fragment>
                                <Grid item xs={12} className={classes.contentItem}>
                                    <Typography  variant="p">
                                        Deletion confirmed. Press the button below to return to your other buildings.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.contentItem}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClose}
                                    >
                                        Return
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Grid item xs={12} className={classes.contentItem}>
                                    <Typography  variant="p">
                                        Unexpected error occurred. Try again later.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.contentItem}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClose}
                                    >
                                        Return
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                )}

                {status.pending && (
                    <Grid container direction="column" alignItems="center" justify="flex-end" className={classes.confirmationContent}>
                        <Grid item xs={12} className={classes.contentItem}>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                )}

                {!(status.pending || status.resolved) && (
                    <Grid container direction="column" alignItems="center" justify="flex-end" className={classes.confirmationContent}>
                        <Grid item xs={12} className={classes.contentItem}>
                            <Typography  variant="p">
                                This action is <b>permanent</b>. Confirm building  deletion by typing <b>{props.slug}</b> below.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.contentItem}>
                            <Typography variant="p">
                                <TextField id="slug-confirmation" variant="outlined" value={confirmationText} onChange={handleChange}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.contentItem}>
                            <Button
                            variant="contained"
                            color="secondary"
                            disabled={confirmationText !== props.slug}
                            onClick={handleConfirm}
                            >
                                Confirm deletion
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Card>
    </Modal>
    )
}

export default DeletionConfirmation;