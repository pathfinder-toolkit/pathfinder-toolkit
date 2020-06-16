import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";


const HeatingCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Heating details</Typography>
        
        {containsCategoryItem("heatingSystem") && (
        <CategoryItem 
        item={props.category.heatingSystem}
        classes={props.classes}
        />)}

        {containsCategoryItem("heatingSource") && (
        <CategoryItem 
        item={props.category.heatingSource}
        classes={props.classes}
        />)}

        {containsCategoryItem("annualCost") && (
        <CategoryItem 
        item={props.category.annualCost}
        classes={props.classes}
        />)}

    </Paper>
}

export default HeatingCategory;