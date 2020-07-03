import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ImageModal from "./ImageModal";

import { Image } from 'cloudinary-react';





const ImageWithModal = (props) => {
  const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: props.width,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
    cardMedia: {
      height:props.height,
      maxWidth:props.width,
      "&:hover": {
        cursor:"pointer"
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
    <Card raised={true} className={classes.card}>
        <CardMedia onClick={ _showImageModal } className={classes.cardMedia}>
          <Image 
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId="pathfinder_userimages/lu8sfgxublj03fojad8c"
          />
        </CardMedia>
      </Card>
      <ImageModal open={showImageModal} onHide={_hideImageModal} image={props.image} />
  </React.Fragment>
}

export default ImageWithModal;