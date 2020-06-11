import React, { useEffect } from "react";
import DetailsCategory from "./ViewerCategories/DetailsCategory.js";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    categoryRoot: {
        margin: theme.spacing(2),
        marginBottom: theme.spacing(4),
    }
  }));

const BuildingViewer = (props) => {
    const classes = useStyles();

    const containsCategory = (category) => {
        return Object.keys(props.building).includes(category);
    }

    return <React.Fragment>
        {containsCategory("details") && (<DetailsCategory
            details={props.building.details}
            classes={classes}
        />)}
        {containsCategory("details") && (<DetailsCategory
            details={props.building.details}
            classes={classes}
        />)}
        {containsCategory("details") && (<DetailsCategory
            details={props.building.details}
            classes={classes}
        />)}
    </React.Fragment>
}

export default BuildingViewer;