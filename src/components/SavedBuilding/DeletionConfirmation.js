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

const DeletionConfirmation = (props) => {
    const classes = props.classes;
    const [confirmationText, setConfirmationText] = useState("");

    const handleConfirmation = (e) => {
        setConfirmationText(e.target.value);
    }

    const test = () => {
        console.log(confirmationText);
        console.log(props.slug);
    }

    return (
    <Modal
    className={classes.modal}
    open={props.show}
    onClose={props.onHide}
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
                    <IconButton aria-label="settings" onClick={props.onHide}>
                      <CloseIcon />
                    </IconButton>
                }
                />

                <Grid container direction="column" alignItems="center" justify="flex-end" className={classes.confirmationContent}>
                    <Grid item xs={12} className={classes.contentItem}>
                        <Typography  variant="p">
                            This action is <b>permanent</b>. Confirm building  deletion by typing <b>{props.slug}</b> below.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.contentItem}>
                        <Typography variant="p">
                            <TextField id="slug-confirmation" variant="outlined" value={confirmationText} onChange={handleConfirmation}/>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.contentItem}>
                        <Button
                        variant="contained"
                        color="secondary"
                        disabled={confirmationText != props.slug}
                        >
                            Confirm deletion
                        </Button>
                    </Grid>
                </Grid>
            </Card>
    </Modal>
    )
}

export default DeletionConfirmation;