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
        <Typography variant="h4" className={classes.categoryHeader}>Ventilation details</Typography>
        
        {containsCategoryItem("system") && (
        <CategoryItem 
        item={props.category.system}
        identifier="System"
        value={props.category.system.value} 
        suggestions={props.category.system.suggestions}
        classes={props.classes}
        />)}

        {containsCategoryItem("airTightness") && (
        <CategoryItem
        item={props.category.airTightness}
        identifier="Air tightness"
        value={props.category.airTightness.value}
        suggestions={props.category.airTightness.suggestions}
        classes={props.classes}
        />)}
        
    </Paper>
}

export default VentilationCategory;