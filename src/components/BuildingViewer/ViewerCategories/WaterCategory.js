import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";


const WaterCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Water details</Typography>

        {containsCategoryItem("heatedWaterEnergySource") && (
            Array.isArray(props.category.heatedWaterEnergySource) ? (
                props.category.heatedWaterEnergySource.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        />
                    )
                })
            ) : (
                <CategoryItem 
                item={props.category.heatedWaterEnergySource}
                classes={props.classes}
                />
            )
        )}
    </Paper>
}

export default WaterCategory;