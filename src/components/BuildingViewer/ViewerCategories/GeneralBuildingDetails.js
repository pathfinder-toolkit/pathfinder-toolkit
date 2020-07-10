import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageWithModal from "../../reusable/ImageWithModal";
import CategoryItemNoSuggestions from "./CategoryItemNoSuggestions";

const GeneralBuildingDetails = (props) => {
    const classes = props.classes;

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.category).includes(categoryItem);
    }

    return <Grid container>
        <Grid container item xs={9} >

            {containsCategoryItem("name") && (
            <CategoryItemNoSuggestions
            item={props.category.name}
            classes={props.classes}
            />)}
            {containsCategoryItem("area") && (
            <CategoryItemNoSuggestions
            item={props.category.area}
            classes={props.classes}
            />)}
            {containsCategoryItem("year") && (
            <CategoryItemNoSuggestions
            item={props.category.year}
            classes={props.classes}
            />)}
            {containsCategoryItem("buildingType") && (
            <CategoryItemNoSuggestions
            item={props.category.buildingType}
            classes={props.classes}
            />)}
            {containsCategoryItem("description") && (
                <Grid item direction="column">
                    <Typography className={classes.categoryItemText}variant="h6">{props.category.description.componentDescription}:</Typography>
                    <Typography className={classes.categoryItemLongText}variant="p">{props.category.description.value}</Typography>
                </Grid>
            )}
            {containsCategoryItem("floorsAmount") && (
            <CategoryItemNoSuggestions
            item={props.category.floorsAmount}
            classes={props.classes}
            />)}

            {containsCategoryItem("floorArea") && (
            <CategoryItemNoSuggestions
            item={props.category.floorArea}
            classes={props.classes}
            />)}

            {containsCategoryItem("heatedFloorArea") && (
            <CategoryItemNoSuggestions
            item={props.category.heatedFloorArea}
            classes={props.classes}
            />)}

        </Grid>
        <Grid item xs={3}>
            {containsCategoryItem("image") && (
                <ImageWithModal
                image={props.category.image.value}
                width={'15vw'}
                height={'25vh'}
                />
            )}
        </Grid>
    </Grid>
}

export default GeneralBuildingDetails;