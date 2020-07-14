import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import CategoryItem from "./CategoryItem.js";
import CategoryItemChangelog from "./CategoryItemChangelog";


const StructureCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Structure details</Typography>

        {containsCategoryItem("wallMaterial") && (
            Array.isArray(props.category.wallMaterial) ? (
                <CategoryItemChangelog
                itemList={props.category.wallMaterial}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.wallMaterial}
                classes={props.classes}
                subject="wallMaterial"
                />
            )
        )}
        {containsCategoryItem("wallThickness") && (
            Array.isArray(props.category.wallThickness) ? (
                <CategoryItemChangelog
                itemList={props.category.wallThickness}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.wallThickness}
                classes={props.classes}
                subject="wallThickness"
                />
            )
        )}
        {containsCategoryItem("windowType") && (
            Array.isArray(props.category.windowType) ? (
                <CategoryItemChangelog
                itemList={props.category.windowType}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.windowType}
                classes={props.classes}
                subject="windowType"
                />
            )
        )}
        {containsCategoryItem("windowAmount") && (
            Array.isArray(props.category.windowAmount) ? (
                <CategoryItemChangelog
                itemList={props.category.windowAmount}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.windowAmount}
                classes={props.classes}
                subject="windowAmount"
                />
            )
        )}
        {containsCategoryItem("heatedWindowType") && (
            Array.isArray(props.category.heatedWindowType) ? (
                <CategoryItemChangelog
                itemList={props.category.heatedWindowType}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.heatedWindowType}
                classes={props.classes}
                subject="heatedWindowType"
                />
            )
        )}
        {containsCategoryItem("heatedWindowAmount") && (
            Array.isArray(props.category.heatedWindowAmount) ? (
                <CategoryItemChangelog
                itemList={props.category.heatedWindowAmount}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.heatedWindowAmount}
                classes={props.classes}
                subject="heatedWindowAmount"
                />
            )
        )}
        {containsCategoryItem("doorMaterial") && (
            Array.isArray(props.category.doorMaterial) ? (
                <CategoryItemChangelog
                itemList={props.category.doorMaterial}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.doorMaterial}
                classes={props.classes}
                subject="doorMaterial"
                />
            )
        )}
        {containsCategoryItem("doorAmount") && (
            Array.isArray(props.category.doorAmount) ? (
                <CategoryItemChangelog
                itemList={props.category.doorAmount}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.doorAmount}
                classes={props.classes}
                subject="doorAmount"
                />
            )
        )}
        {containsCategoryItem("roofMaterial") && (
            Array.isArray(props.category.roofMaterial) ? (
                <CategoryItemChangelog
                itemList={props.category.roofMaterial}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.roofMaterial}
                classes={props.classes}
                subject="roofMaterial"
                />
            )
        )}
        {containsCategoryItem("roofInsulation") && (
            Array.isArray(props.category.roofInsulation) ? (
                <CategoryItemChangelog
                itemList={props.category.roofInsulation}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.roofInsulation}
                classes={props.classes}
                subject="roofInsulation"
                />
            )
        )}
        {containsCategoryItem("roofInsulationThickness") && (
            Array.isArray(props.category.roofInsulationThickness) ? (
                <CategoryItemChangelog
                itemList={props.category.roofInsulationThickness}
                classes={props.classes}
                />
            ) : (
                <CategoryItem 
                item={props.category.roofInsulationThickness}
                classes={props.classes}
                subject="roofInsulationThickness"
                />
            )
        )}
    </Paper>
}

export default StructureCategory;