import React from "react";
import Timeline from '@material-ui/lab/Timeline';
import Typography from '@material-ui/core/Typography';
import CategoryItemWithTimeline from "./CategoryItemWithTimeline"
import CategoryItem from "./CategoryItem.js";

const CategoryItemChangelog = (props) => {
    const classes = props.classes;

    return <React.Fragment>
        {props.itemList.length > 1 ? (
            <React.Fragment>
                <Typography className={classes.categoryItemText}variant="h6">
                    {props.itemList[0].componentDescription} changelog:
                </Typography>
                <Timeline className={classes.timeline}>
                {props.itemList.map((item, index) => {
                    return (
                        <CategoryItemWithTimeline
                        item={item}
                        classes={classes}
                        key={index}
                        />
                    )
                })}
                </Timeline>
            </React.Fragment>
        ) : (
            <CategoryItem 
            item={props.itemList[0]}
            classes={props.classes}
            subject={props.subject}
            />
        )}
    </React.Fragment>
};

export default CategoryItemChangelog;