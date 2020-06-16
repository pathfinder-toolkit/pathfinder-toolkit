import React from "react";
import Paper from "@material-ui/core/Paper";
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
        item={props.category.name}
        classes={props.classes}
        />)}

        {containsCategoryItem("area") && (
        <CategoryItem
        item={props.category.area}
        classes={props.classes}
        />)}

        {containsCategoryItem("year") && (
        <CategoryItem
        item={props.category.year}
        classes={props.classes}
        />)}

        {containsCategoryItem("floorArea") && (
        <CategoryItem
        item={props.category.floorArea}
        classes={props.classes}
        />)}

        {containsCategoryItem("heatedFloorArea") && (
        <CategoryItem
        item={props.category.heatedFloorArea}
        classes={props.classes}
        />)}

        {containsCategoryItem("floorsAmount") && (
        <CategoryItem
        item={props.category.floorsAmount}
        classes={props.classes}
        />)}

        {containsCategoryItem("description") && (
        <CategoryItem
        item={props.category.description}
        classes={props.classes}
        />)}

        {containsCategoryItem("image") && (
        <CategoryItem
        item={props.category.image}
        classes={props.classes}
        />)}
        
    </Paper>
}

export default DetailsCategory;