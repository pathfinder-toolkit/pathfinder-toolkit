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
            Array.isArray(props.category.heatPump) ? (
                props.category.heatPump.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="heatPump"
                        />
                    )
                })
            ) : (
                <CategoryItem 
                item={props.category.heatPump}
                classes={props.classes}
                subject="heatPump"
                />
            )
        )}
        {containsCategoryItem("solarHeat") && (
            Array.isArray(props.category.solarHeat) ? (
                props.category.solarHeat.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="solarHeat"
                        />
                    )
                })
            ) : (
                <CategoryItem 
                item={props.category.solarHeat}
                classes={props.classes}
                subject="solarHeat"
                />
            )
        )}
        {containsCategoryItem("solarElectric") && (
            Array.isArray(props.category.solarElectric) ? (
                props.category.solarElectric.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="solarElectric"
                        />
                    )
                })
            ) : (
                <CategoryItem 
                item={props.category.solarElectric}
                classes={props.classes}
                subject="solarElectric"
                />
            )
        )}
        {containsCategoryItem("bioMass") && (
            Array.isArray(props.category.bioMass) ? (
                props.category.bioMass.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="bioMass"
                        />
                    )
                })
            ) : (
                <CategoryItem 
                item={props.category.bioMass}
                classes={props.classes}
                subject="bioMass"
                />
            )
        )}
        {containsCategoryItem("chp") && (
            Array.isArray(props.category.chp) ? (
                props.category.chp.map((listItem, key) => {
                    return (
                        <CategoryItem
                        item={listItem}
                        classes={props.classes}
                        key={key}
                        subject="chp"
                        />
                    )
                })
            ) : (
                <CategoryItem 
                item={props.category.chp}
                classes={props.classes}
                subject="chp"
                />
            )
        )}
    </Paper>
}

export default RenewableCategory;