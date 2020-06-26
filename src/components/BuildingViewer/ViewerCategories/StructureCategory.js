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

        {containsCategoryItem("wallThickness") && (
        <CategoryItem 
        item={props.category.wallThickness}
        classes={props.classes}
        />)}

        {containsCategoryItem("windowType") && (
        <CategoryItem 
        item={props.category.windowType}
        classes={props.classes}
        />)}

        {containsCategoryItem("windowAmount") && (
        <CategoryItem 
        item={props.category.windowAmount}
        classes={props.classes}
        />)}

        {containsCategoryItem("heatedWindowType") && (
        <CategoryItem 
        item={props.category.heatedWindowType}
        classes={props.classes}
        />)}

        {containsCategoryItem("heatedWindowAmount") && (
        <CategoryItem 
        item={props.category.heatedWindowAmount}
        classes={props.classes}
        />)}

        {containsCategoryItem("doorMaterial") && (
        <CategoryItem 
        item={props.category.doorMaterial}
        classes={props.classes}
        />)}

        {containsCategoryItem("doorAmount") && (
        <CategoryItem 
        item={props.category.doorAmount}
        classes={props.classes}
        />)}

        {containsCategoryItem("roofMaterial") && (
        <CategoryItem 
        item={props.category.roofMaterial}
        classes={props.classes}
        />)}

        {containsCategoryItem("roofInsulation") && (
        <CategoryItem 
        item={props.category.roofInsulation}
        classes={props.classes}
        />)}

        {containsCategoryItem("roofInsulationThickness") && (
        <CategoryItem 
        item={props.category.roofInsulationThickness}
        classes={props.classes}
        />)}
        
    </Paper>
}

export default StructureCategory;