import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { useAdmin } from "../../../utils/AdminProvider";

const AdminNavigationBar = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: theme.spacing(2),
            padding: theme.spacing(1)
        },
        listItem: {
            backgroundColor: "#FFFFFF"
        },
        itemNested: {
            paddingLeft: theme.spacing(4),
        }
    }));

    const classes = useStyles();

    const { setSelectedComponent } = useAdmin();


    const [ showSuggestions, setShowSuggestions ] = useState(false);
    const [ showEditor, setShowEditor ] = useState(false);
    const [ showFeedback, setShowFeedback ] = useState(false);
    const [ showComments, setShowComments ] = useState(false);

    const handleSuggestionClick = () => {
        setShowSuggestions(!showSuggestions);
    };

    const handleCommentClick = () => {
        setShowComments(!showComments);
    }

    const handleEditorClick = () => {
        setShowEditor(!showEditor);
    };

    const handleFeedbackClick = () => {
        setShowFeedback(!showFeedback);
    };

    const handleSelection = (selection) => {
        setSelectedComponent(selection);
    }

    return <Paper className={classes.root}>
        <List component="nav">
            <ListItem button className={classes.listItem} onClick={() => {handleSelection("dashboard")}}>
            <ListItemText><b>Dashboard</b></ListItemText>
            </ListItem>
            <Divider />
            <ListItem button className={classes.listItem} onClick={handleSuggestionClick}>
            <ListItemText><b>Suggestions</b></ListItemText>
            {showSuggestions ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={showSuggestions} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.itemNested} onClick={() => {handleSelection("createNewSuggestion")}}>
                        <ListItemText>Create new suggestion</ListItemText>
                    </ListItem>
                    <ListItem button className={classes.itemNested} onClick={() => {handleSelection("editSuggestions")}}>
                        <ListItemText>Edit suggestions</ListItemText>
                    </ListItem>
                    <ListItem button className={classes.itemNested} onClick={() => {handleSelection("deleteSuggestions")}}>
                        <ListItemText>Delete suggestions</ListItemText>
                    </ListItem>
                </List>
            </Collapse>
            <Divider />
            <ListItem button className={classes.listItem} onClick={handleCommentClick}>
            <ListItemText><b>Comments</b></ListItemText>
            {showComments ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={showComments} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.itemNested} onClick={() => {handleSelection("commentReports")}}>
                        <ListItemText>Review comment reports</ListItemText>
                    </ListItem>
                </List>
            </Collapse>
            <Divider />
            <ListItem button className={classes.listItem} onClick={handleEditorClick}>
            <ListItemText><b>Editor</b></ListItemText>
            {showEditor ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={showEditor} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.itemNested} onClick={() => {handleSelection("regionOptions")}}>
                        <ListItemText>Update region options</ListItemText>
                    </ListItem>
                </List>
            </Collapse>
            <Divider />
            <ListItem button className={classes.listItem} onClick={handleFeedbackClick}>
            <ListItemText><b>Feedback</b></ListItemText>
            {showFeedback ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={showFeedback} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.itemNested} onClick={() => {handleSelection("emailSettings")}}>
                        <ListItemText>Recipient e-mail settings</ListItemText>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    </Paper>
}

export default AdminNavigationBar;