import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { Image } from 'cloudinary-react';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: "pointer"
  },
  image: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #FFF',
    boxShadow: theme.shadows[1],
    maxWidth:"90%",
    maxHeight:"90%",
  }
}));


const ImageModal = (props) => {
  const classes = useStyles();
  const {open, onHide, image} = props;
  

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onHide}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        onClick={onHide}
      >
        <Fade in={open}>
            <Image
              className={classes.image}
              cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
              publicId={image}
            />
        </Fade>
      </Modal>
  );
}

export default ImageModal;