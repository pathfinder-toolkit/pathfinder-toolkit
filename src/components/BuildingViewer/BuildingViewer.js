import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(2),
      marginTop: theme.spacing(2),
    }
  }));

const BuildingViewer = (props) => {
    const classes = useStyles();

    const containsCategory = (category) => {
        return Object.keys(props.building).includes(category);
    }

    return <Container maxWidth={false} className={classes.root}>

        {containsCategory("details") && (<Grid container>
                <Grid item xs={6}>
                    <Typography>{props.building.details.area.value}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{props.building.details.area.value}</Typography>
                </Grid>
            </Grid>
        )}
    </Container>
}

export default BuildingViewer;