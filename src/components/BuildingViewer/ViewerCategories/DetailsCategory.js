import React from "react";
import Paper from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";


const DetailsCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Building details</Typography>
        
        {containsCategoryItem("name") && (
        <CategoryItem 
        identifier="Name" 
        value={props.category.name.value} 
        suggestions={props.category.name.suggestions}
        classes={props.classes}
        />)}

        {containsCategoryItem("area") && (
        <CategoryItem
        identifier="Area"
        value={props.category.area.value}
        suggestions={props.category.area.suggestions}
        classes={props.classes}
        />)}

        {containsCategoryItem("year") && (
        <CategoryItem
        identifier="Construction year"
        value={props.category.year.value}
        suggestions={props.category.year.suggestions}
        classes={props.classes}
        />)}

        {containsCategoryItem("material") && (
        <CategoryItem
        identifier="Material"
        value={props.category.material.value}
        suggestions={props.category.material.suggestions}
        classes={props.classes}
        />)}

        {containsCategoryItem("floors") && (
        <CategoryItem
        identifier="Amount of floors"
        value={props.category.floors.value}
        suggestions={props.category.floors.suggestions}
        classes={props.classes}
        />)}
        
    </Paper>
}

export default DetailsCategory;