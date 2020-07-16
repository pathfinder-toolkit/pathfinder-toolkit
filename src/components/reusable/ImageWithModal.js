import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageModal from "./ImageModal";
import { Image } from 'cloudinary-react';

import axios from "axios";


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
 
  const [ resourceExists, setResourceExists ] = useState(false);

  const checkCloudinaryResource = async (publicId) => {
    const address = encodeURI(
      `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1/${publicId}`
    );
    try {
      const response = await axios.head(address);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  }

  useEffect(() => {
    const checkResource = async () => {
      const response = await checkCloudinaryResource(props.image);
      if (response.status === 200) {
        setResourceExists(true)
      }
    }
    checkResource();
  },[props])


  const _showImageModal = () => {
    setShowImageModal(true);
  }
    
  const _hideImageModal = () => {
      setShowImageModal(false);
  }
    
  return <React.Fragment>
      {resourceExists && (
        <React.Fragment>
          <Image 
            className={classes.image}
            onClick={ _showImageModal }
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={props.image}
            loading="lazy"
          />
          <ImageModal open={showImageModal} onHide={_hideImageModal} image={props.image} />
        </React.Fragment>
      )}
  </React.Fragment>
}

export default ImageWithModal;