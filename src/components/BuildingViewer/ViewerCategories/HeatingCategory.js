import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";
import CategoryItemChangelog from "./CategoryItemChangelog";


const HeatingCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Heating details</Typography>
        
        {containsCategoryItem("heatingSystem") && (
            Array.isArray(props.category.heatingSystem) ? (
                <CategoryItemChangelog
                itemList={props.category.heatingSystem}
                classes={props.classes}
                subject="heatingSystem"
                />
            ) : (
                <CategoryItem 
                item={props.category.heatingSystem}
                classes={props.classes}
                subject="heatingSystem"
                />
            )
        )}
        {containsCategoryItem("heatingSource") && (
            Array.isArray(props.category.heatingSource) ? (
                <CategoryItemChangelog
                itemList={props.category.heatingSource}
                classes={props.classes}
                subject="heatingSource"
                />
            ) : (
                <CategoryItem 
                item={props.category.heatingSource}
                classes={props.classes}
                subject="heatingSource"
                />
            )
        )}
    </Paper>
}

export default HeatingCategory;