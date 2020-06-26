import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";
import GeneralBuildingDetails from "./GeneralBuildingDetails.js";
import ImageWithModal from "../../reusable/ImageWithModal";


const DetailsCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Building details</Typography>

        <GeneralBuildingDetails 
        category={props.category}
        classes={props.classes}
        />

        {containsCategoryItem("annualConsumption") && (
        <CategoryItem 
        item={props.category.annualConsumption}
        classes={props.classes}
        />)}
        {containsCategoryItem("annualCost") && (
        <CategoryItem 
        item={props.category.annualCost}
        classes={props.classes}
        />)}
        {containsCategoryItem("annualHeatingConsumption") && (
        <CategoryItem 
        item={props.category.annualHeatingConsumption}
        classes={props.classes}
        />)}
        {containsCategoryItem("annualHeatingCost") && (
        <CategoryItem 
        item={props.category.annualHeatingCost}
        classes={props.classes}
        />)}

        

        
        
    </Paper>
}

export default DetailsCategory;