import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const NotifyReports = ( {classes, amount} ) => {
    return  <Card className={classes.notificationRoot}>
        <CardHeader
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Reports"
        subheader={`You have ${amount} user experience reports to review.`}
        />
        <Button variant="contained" color="primary" className={classes.notificationButton}>
            Review
        </Button>
    </Card>
}

export default NotifyReports;