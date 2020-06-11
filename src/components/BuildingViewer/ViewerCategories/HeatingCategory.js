import React from "react";
import Paper from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";


const HeatingCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4">Heating details</Typography>
        
        {containsCategoryItem("system") && (
        <CategoryItem 
        identifier="Heating system" 
        value={props.category.system.value}
        suggestions={props.category.system.suggestions}
        classes={props.classes}
        />)}

    </Paper>
}

export default HeatingCategory;