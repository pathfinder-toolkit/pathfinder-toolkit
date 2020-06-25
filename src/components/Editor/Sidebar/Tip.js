import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardContent } from "@material-ui/core";

const Tip = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 250,
      marginBottom: theme.spacing(1),
    },
    header: {
      margin: theme.spacing(-2),
      marginBottom: theme.spacing(2),
      //borderRadius: "2px",
      borderBottom: "1px solid #E0E0E0",
      backgroundColor: "#E0E0E0",
    },
    title: {
      marginLeft: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const text = props.text;
  const title = props.title ? props.title : "Tip";

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <div className={classes.header}>
          <Typography
            className={classes.title}
            variant="subtitle1"
            component="h2"
          >
            {title}
          </Typography>
        </div>

        <Typography variant="body2" component="p">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Tip;
