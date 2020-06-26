import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";


const RenewableCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Renewable energy sources</Typography>
        
        {containsCategoryItem("heatPump") && (
            props.category.heatPump.map((listItem, key) => {
                return (
                    <CategoryItem
                    item={listItem}
                    classes={props.classes}
                    key={key}
                    />
                )
            })
        )}

        {containsCategoryItem("solarHeat") && (
            props.category.solarHeat.map((listItem, key) => {
                return (
                    <CategoryItem
                    item={listItem}
                    classes={props.classes}
                    key={key}
                    />
                )
            })
        )}

        {containsCategoryItem("solarElectric") && (
            props.category.solarElectric.map((listItem, key) => {
                return (
                    <CategoryItem
                    item={listItem}
                    classes={props.classes}
                    key={key}
                    />
                )
            })
        )}

        {containsCategoryItem("bioMass") && (
            props.category.bioMass.map((listItem, key) => {
                return (
                    <CategoryItem
                    item={listItem}
                    classes={props.classes}
                    key={key}
                    />
                )
            })
        )}

        {containsCategoryItem("chp") && (
            props.category.chp.map((listItem, key) => {
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

export default RenewableCategory;