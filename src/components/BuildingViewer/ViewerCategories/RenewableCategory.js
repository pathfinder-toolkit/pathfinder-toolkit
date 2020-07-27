import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";
import CategoryItemChangelog from "./CategoryItemChangelog";


const RenewableCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Renewable energy sources</Typography>

        {containsCategoryItem("heatPump") && (
            Array.isArray(props.category.heatPump) ? (
                <CategoryItemChangelog
                itemList={props.category.heatPump}
                classes={props.classes}
                subject="heatPump"
                />
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
                <CategoryItemChangelog
                itemList={props.category.solarHeat}
                classes={props.classes}
                subject="solarHeat"
                />
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
                <CategoryItemChangelog
                itemList={props.category.solarElectric}
                classes={props.classes}
                subject="solarElectric"
                />
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
                <CategoryItemChangelog
                itemList={props.category.bioMass}
                classes={props.classes}
                subject="bioMass"
                />
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
                <CategoryItemChangelog
                itemList={props.category.chp}
                classes={props.classes}
                subject="chp"
                />
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