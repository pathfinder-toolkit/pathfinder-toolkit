import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import uniqid from "uniqid";

import { useBackend } from "../../../utils/BackendProvider";

const RegionOptionsEditor = (props) => {
    const classes = props.classes;

    const [newOptions, setNewOptions] = useState();

    const {
        updateAreaOptions
    } = useBackend();

    useEffect(() => {
        setNewOptions(
            props.options?.map((option) => {
                return {
                    value: option,
                    id: uniqid.process()
                }
            })
        );
    },[props.options])

    const handleOptionChange = (e) => {
        setNewOptions(newOptions.map(
            (option) => {
                return option.id === e.target.id ? {...option, value: e.target.value} : option;
            })
        );
    }

    const handleRemoveOption = (e) => {
        let currentId = e.target.id;
        if (currentId === '') {
            currentId = e.target.parentNode.id;
        }
        setNewOptions(newOptions.filter(
            (option) => {
                return !(option.id === currentId);
            }
        ));
    }

    const handleAddOption = () => {
        setNewOptions([...newOptions, {value: '', id: uniqid.process()}]);
    }

    const handleSubmit = async () => {
        const requestBody = newOptions.map((option) => {return {option: option.value}});
        await updateAreaOptions(props.identifier, props.areas, requestBody);
        await props.refresh();
    }

    return <React.Fragment>
        <Grid container item xs={12} sm={10} lg={9} direction="row" alignItems="flex-start">
            <Grid container item xs={6} direction="row">
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6" className={classes.subHeader}>Current options</Typography>
                </Grid>
                {props.options?.map((option, index) => {
                    return (
                        <Grid item xs={10} key={index}>
                            <TextField
                            variant="outlined"
                            key={index}
                            className={classes.listItem}
                            fullWidth
                            disabled
                            value={option}
                            >
                            </TextField>
                        </Grid>
                    )
                })}
            </Grid>
           <Grid container item xs={6} direction="row">
                <Typography variant="h6" component="h6" className={classes.subHeader}>Modify options here</Typography>
                {newOptions?.map((option) => {
                    return <Grid item xs={10} key={option.id}>
                        <FormControl className={classes.listItem} key={option.id} fullWidth>
                            <OutlinedInput
                            id={option.id}
                            key={option.id}
                            type="text"
                            aria-label="edit option text"
                            value={option.value}
                            onChange={handleOptionChange}
                            endAdornment={
                            <InputAdornment key={option.id} position="end">
                                <IconButton
                                id={option.id}
                                key={option.id}
                                aria-label="remove option"
                                onClick={handleRemoveOption}
                                edge="end"
                                >
                                    <CloseIcon id={option.id} key={option.id} color="secondary" />
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        </FormControl>
                    </Grid>
                })}
                <Grid item xs={10} key="addButton">
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.listItem}
                    onClick={handleAddOption}
                    >
                        <AddIcon />
                    </Button>
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" className={classes.submitButton} onClick={handleSubmit}>Submit changes</Button>
        </Grid>
    </React.Fragment>
}

export default RegionOptionsEditor;