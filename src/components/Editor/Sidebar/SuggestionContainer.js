import React, { useState, useEffect } from "react";
import { Tab, Tabs, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useEditor } from "../../../utils/EditorProvider";

import SubjectFilter from "./SubjectFilter";
import UserSuggestions from "./UserSuggestions";
import Suggestions from "./Suggestions";

const useStyles = makeStyles((theme) => ({
  suggestionContainer: {
    marginTop: theme.spacing(0),
  },
  suggestionHeader: {
    borderBottom: "1px solid #E0E0E0",
    marginBottom: theme.spacing(1),
  },
  tab: {
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

  const { subjects, suggestions, comments, activeStep } = useEditor();

  const [filteredSubjects, setFilteredSubjects] = useState([]);

  useEffect(() => {
    setFilteredSubjects([]);
  }, [activeStep]);

  const filterSubject = (subject) => {
    if (filteredSubjects.includes(subject)) {
      // remove subject from filtered list
      setFilteredSubjects(filteredSubjects.filter((item) => item !== subject));
      return;
    }

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
        <Tab label="User experiences" />
      </Tabs>
      <SubjectFilter
        subjects={subjects}
        filtered={filteredSubjects}
        handleClick={(subject) => filterSubject(subject)}
      />
      <TabPanel value={value} index={0}>
        <Suggestions
          suggestions={suggestions}
          filteredSubjects={filteredSubjects}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserSuggestions
          userSuggestions={comments}
          filteredSubjects={filteredSubjects}
        />
      </TabPanel>
    </React.Fragment>
  );
};

export default SuggestionContainer;
