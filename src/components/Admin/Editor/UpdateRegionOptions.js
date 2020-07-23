import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { useBackend } from "../../../utils/BackendProvider";
import RegionOptionsEditor from "./RegionOptionsEditor";

const UpdateRegionOptions = (props) => {
    const classes = props.style;
    const [ areas, setAreas ] = useState();
    const [ selectedArea, setSelectedArea ] = useState();
    const [ fields, setFields ] = useState();
    const [ selectedField, setSelectedField ] = useState();
    const [ options, setOptions ] = useState();

    const {
        requestAreas,
        getSuggestionSubjectsForAdmin,
        getSuggestionSubjectOptions,
    } = useBackend();

    const fetchAreas = async () => {
        const fetchedAreas = await requestAreas();
        if (fetchedAreas) {
            fetchedAreas.push({areaName: "All regions", idArea: fetchedAreas.map(area => area.idArea).join(",")});
            setAreas(fetchedAreas);
        }
    }

    const fetchFields = async () => {
        const response = await getSuggestionSubjectsForAdmin();
        if (response.status === 200) {
            const filteredFields = response.data.filter(field => field.valueType === 'string')
            setFields(filteredFields);
        }
    }

    const fetchOptions = async (identifier) => {
        const response = await getSuggestionSubjectOptions(identifier, selectedArea.idArea)
        if (response.status === 200) {
            setOptions(response.data);
        }
    }

    useEffect(() => {
        fetchAreas();
    }, []);

    const clearAreaSelection = () => {
        setSelectedField(null);
        setFields(null);
        setOptions(null);
    }

    const clearFieldSelection = () => {
        setOptions(null);
    }

    const handleAreaSelection = async (e) => {
        clearAreaSelection();
        await fetchFields();
        setSelectedArea(e.target.value);
    }

    const handleFieldSelection = async (e) => {
        clearFieldSelection();
        await fetchOptions(e.target.value.identifier)
        setSelectedField(e.target.value);
    }

    const refreshOptions = async () => {
        clearFieldSelection();
        await fetchOptions(selectedField.identifier);
    }

    return <React.Fragment>
        <Typography variant="h4" component="h4" className={classes.header}>Update region options</Typography>
        <Grid container fullWidth direction="column">
        <Typography variant="h6" component="h6" className={classes.subHeader}>Select region</Typography>
            <Grid item sm={9} md={7} lg={5} xl={4}>
                <TextField
                    variant="outlined"
                    label="Area"
                    select
                    fullWidth
                    className={classes.textField}
                    onChange={handleAreaSelection}
                >
                    {areas?.map((area, index) => (
                        <MenuItem key={index} value={area}>
                            {area.areaName}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
        {selectedArea && (
            <React.Fragment>
                <Typography variant="h6" component="h6" className={classes.subHeader}>Select field</Typography>
                <Grid item sm={9} md={7} lg={5} xl={4}>
                    <TextField
                        variant="outlined"
                        label="Field"
                        select
                        fullWidth
                        className={classes.textField}
                        onChange={handleFieldSelection}
                    >
                        {fields?.map((field, index) => (
                            <MenuItem key={index} value={field}>
                                {field.subject}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </React.Fragment>
        )}
        {selectedField && (
            <RegionOptionsEditor
            classes={classes}
            identifier={selectedField.identifier}
            areas={selectedArea.idArea}
            options={options}
            refresh={refreshOptions}
            />
        )}
    </React.Fragment>
}

export default UpdateRegionOptions;