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
        <Typography variant="h4">Building details</Typography>
        
        {containsCategoryItem("name") && (
        <CategoryItem 
        identifier="Name" 
        value={props.category.name.value} 
        />)}

        {containsCategoryItem("area") && (
        <CategoryItem
        identifier="Area"
        value={props.category.area.value}
        />)}

        {containsCategoryItem("year") && (
        <CategoryItem
        identifier="Construction year"
        value={props.category.year.value}
        />)}

        {containsCategoryItem("material") && (
        <CategoryItem
        identifier="Material"
        value={props.category.material.value}
        />)}

        {containsCategoryItem("floors") && (
        <CategoryItem
        identifier="Amount of floors"
        value={props.category.floors.value}
        />)}
        
    </Paper>
}

export default DetailsCategory;