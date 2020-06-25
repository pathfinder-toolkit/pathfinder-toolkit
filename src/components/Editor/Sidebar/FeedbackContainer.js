import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Tab, Tabs, Box } from "@material-ui/core";
import SuggestionContainer from "./SuggestionContainer";

const useStyles = makeStyles((theme) => ({
  suggestionContainer: {
    marginTop: theme.spacing(0),
    padding: theme.spacing(0.5),
    border: "1px solid black", //debug
  },
  suggestionHeader: {
    borderBottom: "1px solid #E0E0E0",
    marginBottom: theme.spacing(1),
  },
  tab: {
    //backgroundColor: "#EEEEEE",
    marginRight: theme.spacing(0),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const FeedbackContainer = (props) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs
        className={classes.tab}
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Suggestions" />
        <Tab label="User comments" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SuggestionContainer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        User comments
      </TabPanel>
    </React.Fragment>
  );
};

export default FeedbackContainer;
