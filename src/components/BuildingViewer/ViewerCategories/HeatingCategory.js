import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";


const HeatingCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Heating details</Typography>
        
        {containsCategoryItem("heatingSystem") && (
            props.category.heatingSystem.map((listItem, key) => {
                return (
                    <CategoryItem
                    item={listItem}
                    classes={props.classes}
                    key={key}
                    />
                )
            })
        )}

        {containsCategoryItem("heatingSource") && (
            props.category.heatingSource.map((listItem, key) => {
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

export default HeatingCategory;