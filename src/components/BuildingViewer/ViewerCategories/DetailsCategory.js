import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";
import CategoryItemChangelog from "./CategoryItemChangelog";

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
            Array.isArray(props.category.annualConsumption) ? (
                <CategoryItemChangelog
                itemList={props.category.annualConsumption}
                classes={props.classes}
                subject="annualConsumption"
                />
            ) : (
                <CategoryItem 
                item={props.category.annualConsumption}
                classes={props.classes}
                subject="annualConsumption"
                />
            )
        )}
        {containsCategoryItem("annualCost") && (
            Array.isArray(props.category.annualCost) ? (
                <CategoryItemChangelog
                itemList={props.category.annualCost}
                classes={props.classes}
                subject="annualCost"
                />
            ) : (
                <CategoryItem 
                item={props.category.annualCost}
                classes={props.classes}
                subject="annualCost"
                />
            )
        )}
        {containsCategoryItem("annualHeatingConsumption") && (
            Array.isArray(props.category.annualHeatingConsumption) ? (
                <CategoryItemChangelog
                itemList={props.category.annualHeatingConsumption}
                classes={props.classes}
                subject="annualHeatingConsumption"
                />
            ) : (
                <CategoryItem 
                item={props.category.annualHeatingConsumption}
                classes={props.classes}
                subject="annualHeatingConsumption"
                />
            )
        )}
        {containsCategoryItem("annualHeatingCost") && (
            Array.isArray(props.category.annualHeatingCost) ? (
                <CategoryItemChangelog
                itemList={props.category.annualHeatingCost}
                classes={props.classes}
                subject="annualHeatingCost"
                />
            ) : (
                <CategoryItem 
                item={props.category.annualHeatingCost}
                classes={props.classes}
                subject="annualHeatingCost"
                />
            )
        )}
    </Paper>
}

export default DetailsCategory;