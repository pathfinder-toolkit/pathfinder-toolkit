import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";


const ElectricCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Electricity details</Typography>

        {containsCategoryItem("annualUse") && (
            Array.isArray(props.category.annualUse) ? (
                props.category.annualUse.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="annualUse"
                        />
                    )
                })
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
                props.category.annualElectricityUse.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="annualElectricityUse"
                        />
                    )
                })
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
        {containsCategoryItem("annualElectricityCost") && (
            Array.isArray(props.category.annualElectricityCost) ? (
                props.category.annualElectricityCost.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="annualElectricityCost"
                        />
                    )
                })
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