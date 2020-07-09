import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import SuggestionAlert from "../../reusable/SuggestionAlert.js";
import CommentField from "../../Comment/CommentField.js";

const CategoryItem = (props) => {
    const classes = props.classes;

    return <Grid container>
        <Grid item xs={4}>
            <Typography className={classes.categoryItemText}variant="h6">
                {props.item.componentDescription}: {typeof props.item.value === "boolean" ? (
                        <Checkbox
                        size="large"
                        disabled
                        indeterminate={!props.item.value}
                        checked={props.item.value}
                        style={props.item.value ? {color: "#00e676"} : {color: "#ff0076"} }
                        className={props.item.value ? classes.checkBoxChecked : classes.checkBoxNotChecked}
                        />
                    ) : (
                        props.item.value
                    )
                }
            </Typography>
        </Grid>
        <Grid item xs={4}>
            {props.item.suggestions && props.item.suggestions.map((suggestion, key) => {
                return <SuggestionAlert suggestion={suggestion} classes={classes} key={key} />
            })}
        </Grid>
        <Grid item xs={4}>
            {props.item.hasSuggestions && <CommentField subject={props.subject}/>}
        </Grid>
    </Grid>
}

export default CategoryItem;