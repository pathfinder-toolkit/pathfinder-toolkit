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

const RegionOptionsEditor = (props) => {
    const classes = props.classes;

    const [newOptions, setNewOptions] = useState();

    useEffect(() => {
        setNewOptions(props.options);
    },[props.options])

    const handleOptionChange = (e) => {
        setNewOptions(newOptions.map(
            (option, index) => {
                return index == e.target.id ? e.target.value : option;
            })
        );
    }

    const handleRemoveOption = (e) => {
        let currentIndex = e.target.id;
        if (currentIndex === '') {
            currentIndex = e.target.parentNode.id;
        }
        setNewOptions(newOptions.filter(
            (option, index) => {
                console.log(option);
                console.log(index);
                return !(index == e.target.id);
            })
        );
    }

    const handleAddOption = () => {
        setNewOptions([...newOptions, '']);
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
                 {/*{newOptions.map((option, index) => {
                    return (
                        <Grid item xs={10} key={index}>
                            <TextField
                            variant="outlined"
                            className={classes.listItem}
                            fullWidth
                            value={option}
                            id={index}
                            onChange={handleOptionChange}
                            >
                            </TextField>
                        </Grid>
                    )
                })}*/}
                {newOptions?.map((option, index) => {
                    return <Grid item xs={10} key={index}>
                        <FormControl className={classes.listItem} key={index} fullWidth>
                            <OutlinedInput
                            id={index}
                            key={index}
                            type="text"
                            aria-label="edit option text"
                            value={option}
                            onChange={handleOptionChange}
                            endAdornment={
                            <InputAdornment key={index} position="end">
                                <IconButton
                                id={index}
                                key={index}
                                aria-label="remove option"
                                onClick={handleRemoveOption}
                                edge="end"
                                >
                                    <CloseIcon id={index} key={index} color="secondary" />
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
                    <AddIcon></AddIcon>
                </Button>
                </Grid>
            </Grid>
        </Grid>
    </React.Fragment>
}

export default RegionOptionsEditor;