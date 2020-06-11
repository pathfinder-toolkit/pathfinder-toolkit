import React from "react";
import Paper from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";


const VentilationCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4">Ventilation details</Typography>
        
        {containsCategoryItem("system") && (
        <CategoryItem 
        identifier="System" 
        value={props.category.system.value} 
        />)}

        {containsCategoryItem("airTightness") && (
        <CategoryItem
        identifier="Air tightness"
        value={props.category.airTightness.value}
        />)}
        
    </Paper>
}

export default VentilationCategory;