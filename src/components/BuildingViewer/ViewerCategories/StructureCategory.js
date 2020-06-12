import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import CategoryItem from "./CategoryItem.js";


const StructureCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Structure details</Typography>
        
        {containsCategoryItem("wallMaterial") && (
        <CategoryItem 
        item={props.category.wallMaterial}
        classes={props.classes}
        />)}

        {containsCategoryItem("roofType") && (
        <CategoryItem
        item={props.category.roofType}
        classes={props.classes}
        />)}

        {containsCategoryItem("windowCount") && (
        <CategoryItem
        item={props.category.windowCount}

        classes={props.classes}
        />)}
        
    </Paper>
}

export default StructureCategory;