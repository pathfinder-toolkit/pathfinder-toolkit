import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs, Box } from "@material-ui/core";

import { useEditor } from "../../../utils/EditorProvider";
import SubjectFilter from "./SubjectFilter";
import { Subject } from "@material-ui/icons";
import UserSuggestions from "./UserSuggestions";
import Suggestions from "./Suggestions"

const useStyles = makeStyles((theme) => ({
  suggestionContainer: {
    marginTop: theme.spacing(0),
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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const SuggestionContainer = (props) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const { subjects, suggestionsLoading } = useEditor();

  const [filteredSubjects, setFilteredSubjects] = useState([
    "test",
    "filtered",
  ]);

  const filterSubject = (subject) => {
    if (filteredSubjects.includes(subject)) {
      setFilteredSubjects(filteredSubjects.filter((item) => item !== subject));
      return;
    }

    console.log("filtering: " + subject);
    setFilteredSubjects([...filteredSubjects, subject]);
  };

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
      <SubjectFilter
        subjects={subjects}
        filtered={filteredSubjects}
        handleClick={(subject) => filterSubject(subject)}
      />
      <TabPanel value={value} index={0}>
        <Suggestions filteredSubjects={filteredSubjects} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserSuggestions filteredSubjects={filteredSubjects} />
      </TabPanel>
    </React.Fragment>
  );
};

export default SuggestionContainer;
