import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const PanelGap = ({style}) => {
    return <Grid item>
        <Box className={style}/>
    </Grid>
}

export default PanelGap;