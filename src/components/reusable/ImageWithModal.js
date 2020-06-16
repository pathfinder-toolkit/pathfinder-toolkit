import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ImageModal from "./ImageModal";

const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth:90
    },
    cardMedia: {
      height:90,
      maxWidth:90,
      "&:hover": {
        cursor:"pointer"
      }
    }
  }));

const ImageWithModal = (props) => {
    const classes = useStyles();
    const [showImageModal, setShowImageModal] = useState(false);

    const _showImageModal = () => {
        setShowImageModal(true);
    }
    
    const _hideImageModal = () => {
        setShowImageModal(false);
    }
    
    return <React.Fragment>
        <Card raised={true} className={classes.card}>
            <CardMedia onClick={ _showImageModal } className={classes.cardMedia} image={props.image} />
        </Card>
        <ImageModal open={showImageModal} onHide={_hideImageModal} image={props.image} />
    </React.Fragment>
}

export default ImageWithModal;