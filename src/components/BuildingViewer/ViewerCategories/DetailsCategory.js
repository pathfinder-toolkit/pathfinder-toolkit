import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const DetailsCategory = (props) => {

    const containsCategoryItem = (categoryItem) => {
        return Object.keys(props.details).includes(categoryItem);
    }

    return <React.Fragment>
        {containsCategoryItem("name") && (<Grid container>
                <Grid item xs={6}>
                    <Typography>{props.details.name.value}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{props.details.area.value}</Typography>
                </Grid>
            </Grid>
        )}
    </React.Fragment>
}

export default DetailsCategory;