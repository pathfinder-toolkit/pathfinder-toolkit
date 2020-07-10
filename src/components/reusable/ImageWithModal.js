import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ImageModal from "./ImageModal";

import { Image } from 'cloudinary-react';





const ImageWithModal = (props) => {
  const useStyles = makeStyles((theme) => ({
    image: {
      border: "2px solid #3F51B5",
      borderRadius: "4px",
      maxWidth: props.width,
      maxHeight: props.height,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      "&:hover": {
        cursor:"pointer",
      }
    }
  }));

  const classes = useStyles();
  const [showImageModal, setShowImageModal] = useState(false);

  const _showImageModal = () => {
    setShowImageModal(true);
  }
    
  const _hideImageModal = () => {
      setShowImageModal(false);
  }
    
  return <React.Fragment>
      <Image 
        className={classes.image}
        onClick={ _showImageModal }
        cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
        publicId={props.image}
      />
      <ImageModal open={showImageModal} onHide={_hideImageModal} image={props.image} />
  </React.Fragment>
}

export default ImageWithModal;