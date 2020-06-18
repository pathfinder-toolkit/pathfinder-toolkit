import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageWithModal from "../../reusable/ImageWithModal";

const GeneralBuildingDetails = (props) => {
    const classes = props.classes;

    return <Grid container>
        <Grid container item xs={9} >
            {props.name && (<Grid item direction="column">
            <Typography className={classes.categoryItemText}variant="h6">{props.name.propertyName}: {props.name.value}</Typography>
            </Grid>
            )}
            {props.description && (
                <Grid item direction="column">
                    <Typography className={classes.categoryItemText}variant="h6">{props.description.propertyName}:</Typography>
                    <Typography className={classes.categoryItemLongText}variant="p">{props.description.value}</Typography>
                </Grid>
            )}
        </Grid>
        <Grid item xs={3}>
            {props.image && (
                <ImageWithModal
                image={props.image}
                height={300}
                width={300}
                />
            )}
        </Grid>
    </Grid>
}

export default GeneralBuildingDetails;