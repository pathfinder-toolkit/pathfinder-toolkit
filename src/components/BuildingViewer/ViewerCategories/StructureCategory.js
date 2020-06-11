import React from "react";
import Paper from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CategoryItem from "./CategoryItem.js";


const StructureCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4">Structure details</Typography>
        
        {containsCategoryItem("wallMaterial") && (
        <CategoryItem 
        identifier="Wall material" 
        value={props.category.wallMaterial.value} 
        />)}

        {containsCategoryItem("roofType") && (
        <CategoryItem
        identifier="Roof type"
        value={props.category.roofType.value}
        />)}

        {containsCategoryItem("windowCount") && (
        <CategoryItem
        identifier="Window count"
        value={props.category.windowCount.value}
        />)}
        
    </Paper>
}

export default StructureCategory;