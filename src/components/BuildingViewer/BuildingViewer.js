import React, { useEffect } from "react";
import DetailsCategory from "./ViewerCategories/DetailsCategory.js";
import StructureCategory from "./ViewerCategories/StructureCategory.js";
import HeatingCategory from "./ViewerCategories/HeatingCategory.js";
import VentilationCategory from "./ViewerCategories/VentilationCategory.js";

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
            category={props.building.details}
            classes={classes}
        />)}
        {containsCategory("structure") && (<StructureCategory
            category={props.building.structure}
            classes={classes}
        />)}
        {containsCategory("heating") && (<HeatingCategory
            category={props.building.heating}
            classes={classes}
        />)}
        {containsCategory("ventilation") && (<VentilationCategory
            category={props.building.ventilation}
            classes={classes}
        />)}
    </React.Fragment>
}

export default BuildingViewer;