import React from "react";
import Grid from "@material-ui/core/Grid";

const PanelImage = ({image, style}) => {
    return <Grid item>
        <img src={image} className={style}></img>
    </Grid>
}

export default PanelImage;