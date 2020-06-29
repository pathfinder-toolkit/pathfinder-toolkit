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
            props.category.heatedWaterEnergySource.map((listItem, key) => {
                return (
                    <CategoryItem
                    item={listItem}
                    classes={props.classes}
                    key={key}
                    />
                )
            })
        )}
        
    </Paper>
}

export default WaterCategory;