import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import DetailsCategory from "./ViewerCategories/DetailsCategory.js";
import StructureCategory from "./ViewerCategories/StructureCategory.js";
import HeatingCategory from "./ViewerCategories/HeatingCategory.js";
import VentilationCategory from "./ViewerCategories/VentilationCategory.js";
import TopSuggestions from "./ViewerCategories/TopSuggestions.js";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#eceef8",
        margin:theme.spacing(2),
        padding:theme.spacing(1),
    },
    categoryRoot: {
        borderRadius: theme.borderRadius,
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    },
    categoryHeader: {
        marginLeft:theme.spacing(1),
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2),
    },
    categoryItemText: {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    suggestionAlert: {
        marginBottom:theme.spacing(4),
        marginRight:theme.spacing(2),
        fontSizeAdjust: 0.6,
        lineHeight: 1.8
    }
  }));

const BuildingViewer = (props) => {
    const classes = useStyles();

    const containsCategory = (category) => {
        return Object.keys(props.building).includes(category);
    }

    const [topSuggestionDataset, setTopSuggestionDataset] = useState(null);


    useEffect(() => {
        const findCategoryItemsWithSuggestions = (buildingObject) => {
            let categoryItemsWithSuggestions = [];
            for (let category in buildingObject) {
                for (let categoryItem in buildingObject[category] ) {
                    if (Object.keys(buildingObject[category][categoryItem]).includes("suggestions")) {
                        if (buildingObject[category][categoryItem].suggestions.length > 0) {
                            categoryItemsWithSuggestions = categoryItemsWithSuggestions.concat(buildingObject[category][categoryItem]);
                            console.log(categoryItemsWithSuggestions);
                        }
                    }
                }
            }
            return categoryItemsWithSuggestions;
        }

        const categoryItemComparator = (categoryItem1, categoryItem2) => {
            return categoryItem2.suggestions[0].priority - categoryItem1.suggestions[0].priority;
        };

        const categoryItemsToSort = findCategoryItemsWithSuggestions(props.building);
        const sortedCategoryItems = categoryItemsToSort.sort(categoryItemComparator);
        const topCategories = sortedCategoryItems.slice(0,5);

        setTopSuggestionDataset(topCategories);
        
    },[props.building]);

    return <Paper className={classes.root}>

        {topSuggestionDataset &&  (<TopSuggestions
            data={topSuggestionDataset}
            classes={classes}
        />)}

        {containsCategory("details") && (<DetailsCategory
            category={props.building.details}
            classes={classes}
        />)}
        {containsCategory("heating") && (<HeatingCategory
            category={props.building.heating}
            classes={classes}
        />)}
        {containsCategory("electricity") && (<HeatingCategory
            category={props.building.heating}
            classes={classes}
        />)}
        {containsCategory("structure") && (<StructureCategory
            category={props.building.structure}
            classes={classes}
        />)}
        {containsCategory("ventilation") && (<VentilationCategory
            category={props.building.ventilation}
            classes={classes}
        />)}
    </Paper>
}

export default BuildingViewer;