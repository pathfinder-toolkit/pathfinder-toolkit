import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import CategoryItem from "./CategoryItem.js";


const StructureCategory = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Paper className={classes.categoryRoot}>
        <Typography variant="h4" className={classes.categoryHeader}>Structure details</Typography>

        {containsCategoryItem("wallMaterial") && (
            Array.isArray(props.category.wallMaterial) ? (
                props.category.wallMaterial.map((listItem, key) => {
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
                item={props.category.wallMaterial}
                classes={props.classes}
                />
            )
        )}
        {containsCategoryItem("wallThickness") && (
            Array.isArray(props.category.wallThickness) ? (
                props.category.wallThickness.map((listItem, key) => {
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
                item={props.category.wallThickness}
                classes={props.classes}
                />
            )
        )}
        {containsCategoryItem("windowType") && (
            Array.isArray(props.category.windowType) ? (
                props.category.windowType.map((listItem, key) => {
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
                item={props.category.windowType}
                classes={props.classes}
                />
            )
        )}
        {containsCategoryItem("windowAmount") && (
            Array.isArray(props.category.windowAmount) ? (
                props.category.windowAmount.map((listItem, key) => {
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
                item={props.category.windowAmount}
                classes={props.classes}
                />
            )
        )}
        {containsCategoryItem("heatedWindowType") && (
            Array.isArray(props.category.heatedWindowType) ? (
                props.category.heatedWindowType.map((listItem, key) => {
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
                item={props.category.heatedWindowType}
                classes={props.classes}
                />
            )
        )}
        {containsCategoryItem("heatedWindowAmount") && (
            Array.isArray(props.category.heatedWindowAmount) ? (
                props.category.heatedWindowAmount.map((listItem, key) => {
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
                item={props.category.heatedWindowAmount}
                classes={props.classes}
                />
            )
        )}
        {containsCategoryItem("doorMaterial") && (
            Array.isArray(props.category.doorMaterial) ? (
                props.category.doorMaterial.map((listItem, key) => {
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
                item={props.category.doorMaterial}
                classes={props.classes}
                />
            )
        )}
        {containsCategoryItem("doorAmount") && (
            Array.isArray(props.category.doorAmount) ? (
                props.category.doorAmount.map((listItem, key) => {
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
                item={props.category.doorAmount}
                classes={props.classes}
                />
            )
        )}
        {containsCategoryItem("roofMaterial") && (
            Array.isArray(props.category.roofMaterial) ? (
                props.category.roofMaterial.map((listItem, key) => {
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
                item={props.category.roofMaterial}
                classes={props.classes}
                />
            )
        )}
        {containsCategoryItem("roofInsulation") && (
            Array.isArray(props.category.roofInsulation) ? (
                props.category.roofInsulation.map((listItem, key) => {
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
                item={props.category.roofInsulation}
                classes={props.classes}
                />
            )
        )}
        {containsCategoryItem("roofInsulationThickness") && (
            Array.isArray(props.category.roofInsulationThickness) ? (
                props.category.roofInsulationThickness.map((listItem, key) => {
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
                item={props.category.roofInsulationThickness}
                classes={props.classes}
                />
            )
        )}
    </Paper>
}

export default StructureCategory;