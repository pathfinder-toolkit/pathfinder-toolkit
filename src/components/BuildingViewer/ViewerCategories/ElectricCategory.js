import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";
import CategoryItemChangelog from "./CategoryItemChangelog";


const ElectricCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Electricity details</Typography>

        {containsCategoryItem("annualUse") && (
            Array.isArray(props.category.annualUse) ? (
                <CategoryItemChangelog
                itemList={props.category.annualUse}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.annualUse}
                classes={props.classes}
                subject="annualUse"
                />
            )
        )}
        {containsCategoryItem("annualElectricityUse") && (
            Array.isArray(props.category.annualElectricityUse) ? (
                <CategoryItemChangelog
                itemList={props.category.annualElectricityUse}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.annualElectricityUse}
                classes={props.classes}
                subject="annualElectricityUse"
                />
            )
        )}
        {containsCategoryItem("annualCost") && (
            Array.isArray(props.category.annualCost) ? (
                <CategoryItemChangelog
                itemList={props.category.annualCost}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.annualCost}
                classes={props.classes}
                subject="annualCost"
                />
            )
        )}
        {containsCategoryItem("annualElectricityCost") && (
            Array.isArray(props.category.annualElectricityCost) ? (
                <CategoryItemChangelog
                itemList={props.category.annualElectricityCost}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.annualElectricityCost}
                classes={props.classes}
                subject="annualElectricityCost"
                />
            )
        )}
    </Paper>
}

export default ElectricCategory;