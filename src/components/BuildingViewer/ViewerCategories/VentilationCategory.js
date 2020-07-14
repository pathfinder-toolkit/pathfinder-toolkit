import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";


const VentilationCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Ventilation details</Typography>

        {containsCategoryItem("ventilationSystem") && (
            Array.isArray(props.category.ventilationSystem) ? (
                props.category.ventilationSystem.map((listItem, key) => {
                    console.log(listItem);
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
                item={props.category.ventilationSystem}
                classes={props.classes}
                />
            )
        )}
        
    </Paper>
}

export default VentilationCategory;