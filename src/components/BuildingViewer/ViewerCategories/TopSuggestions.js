import React from "react";
import Paper from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CategoryItem from "./CategoryItem.js";

const TopSuggestions = (props) => {
    const classes = props.classes;

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Top suggestions</Typography>

         {props.data.map((item, key) => {
             return (
             <CategoryItem 
             item={item}
             classes={props.classes}
             key={key}
             />
                )
         })}
        
        {/*<CategoryItem 
        item={props.category.wallMaterial}
        classes={props.classes}
        />*/}
        
    </Paper>
}

export default TopSuggestions;