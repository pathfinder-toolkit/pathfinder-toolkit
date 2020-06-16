import React from "react";

const ImageComponentWithModal = (props) => {
    return <React.Fragment>
        <Card raised={true} className={classes.card}>
            <CardMedia onClick={ _showImageModal } className={classes.cardMedia} image={row.image} />
        </Card>
        <BuildingImageModal open={showImageModal} onHide={_hideImageModal} image={row.image} />
    </React.Fragment>
}

export default ImageComponentWithModal;