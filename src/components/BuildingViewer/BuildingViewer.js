import React, { useEffect } from "react";
import Container from '@material-ui/core/Container';
import DetailsCategory from "./ViewerCategories/DetailsCategory.js";

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

        {containsCategory("details") && (<DetailsCategory
            details={props.building.details}
        />)}
    </Container>
}

export default BuildingViewer;