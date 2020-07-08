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
            Array.isArray(props.category.heatingSystem) ? (
                props.category.heatingSystem.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="heatingSystem"
                        />
                    )
                })
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
                props.category.heatingSource.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="heatingSource"
                        />
                    )
                })
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