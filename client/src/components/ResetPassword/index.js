import React, {useState} from 'react';
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";

import useStyle from './style.js';
import ShowToast from "../ShowToast";
import {ERROR, SUCCESS} from "../../store/types";

import * as api from '../../api/index.js';
import {useHistory} from "react-router-dom";

const ResetPassword = () => {

    const classes = useStyle();
    const history = useHistory();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const [checked, setChecked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "" || confirmPassword === "") {
            ShowToast(ERROR, "Please fill all the fields!");
        } else if (password !== confirmPassword) {
            ShowToast(ERROR, "Passwords did not match!");
        } else {
            if (password.length <= 6) {
                ShowToast(ERROR, "Password must be of length 7 or greater.");
            } else {
                try {
                    const {data} = await api.ResetPassword(email, password);
                    history.push("/auth");
                    ShowToast(SUCCESS, "Password reset successfully!");
                } catch (e) {
                    const message = e.response.data.message || "Error in resetting password!";
                    ShowToast(ERROR, message);
                }
            }
        }
    }

    return (
        <>
            <Paper elevation={7} className={classes.paper}>
                <div style={{textAlign: "center"}}>
                    <Typography variant={"h6"}>
                        Reset Password
                    </Typography>
                </div>
                <Divider/>
                <form autoComplete={false} onSubmit={handleSubmit}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <div style={{margin: "8px 0"}}>
                            <TextField
                                name={"email"}
                                variant={"outlined"}
                                value={email}
                                label={"Email"}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{marginBottom: "8px"}}>
                            <TextField
                                name={"password"}
                                variant={"outlined"}
                                value={password}
                                label={"New Password"}
                                type={checked ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{marginBottom: "8px"}}>
                            <TextField
                                name={"password"}
                                variant={"outlined"}
                                value={confirmPassword}
                                label={"Confirm Password"}
                                type={checked ? "text" : "password"}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <FormControlLabel
                            control={<Checkbox
                                checked={checked}
                                onChange={() => setChecked((prevState) => !prevState)}
                                color="primary"
                                inputProps={{'aria-label': 'secondary checkbox'}}
                            />}
                            label={"Show Password"}
                        />
                        <div style={{marginBottom: "8px"}}>
                            <Button variant={"contained"} color={"primary"} type={"submit"}>
                                Reset Password
                            </Button>
                        </div>
                    </div>
                </form>
            </Paper>
        </>
    );
};

export default ResetPassword;