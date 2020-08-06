import React from "react";
import Grid from "@material-ui/core/Grid";
import CardMedia from '@material-ui/core/CardMedia'

const PanelImage = ({image, style}) => {
    return <Grid item>
        <CardMedia>
        <img src={image} className={style} alt="instruction"></img>
        </CardMedia>
    </Grid>
}

export default PanelImage;