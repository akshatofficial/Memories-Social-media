import React from 'react';

import {Grid, InputAdornment, TextField, IconButton} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons";

const Input = ({half, handleChange, name, label, autoFocus, type, handleShowPassword}) => {
    return (
        <Grid item={true} xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                type={type}
                onChange={handleChange}
                autoFocus={autoFocus}
                fullWidth={true}
                variant={"outlined"}
                required={true}
                InputProps={
                    (name === "password" || name === "confirmPassword") && {
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                <IconButton onClick={handleShowPassword}>
                                    {type === "password" ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }
            />
        </Grid>
    );
};

export default Input;