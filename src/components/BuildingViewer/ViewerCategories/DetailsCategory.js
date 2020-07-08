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
            Array.isArray(props.category.annualConsumption) ? (
                props.category.annualConsumption.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="annualConsumption"
                        />
                    )
                })
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
                props.category.annualCost.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="annualCost"
                        />
                    )
                })
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
                props.category.annualHeatingConsumption.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="annualHeatingConsumption"
                        />
                    )
                })
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
                props.category.annualHeatingCost.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="annualHeatingCost"
                        />
                    )
                })
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