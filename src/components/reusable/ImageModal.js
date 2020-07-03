import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import { Image } from 'cloudinary-react';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: "pointer"
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #FFF',
    boxShadow: theme.shadows[1],
    padding: theme.spacing(0,0,0),
    width:"90%",
    height:"90%",
  },
  cardMedia: {
    padding: theme.spacing(1,1,1),
    height:"100%"
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
            <Card raised={true} className={classes.card}>
                <CardMedia className={classes.cardMedia}>
                  <Image
                    cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                    publicId="pathfinder_userimages/lu8sfgxublj03fojad8c" 
                  />
                </CardMedia>
            </Card>
        </Fade>
      </Modal>
  );
}

export default ImageModal;