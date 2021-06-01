import React, {useEffect, useState} from 'react';
import {Paper, TextField, Typography, Button, Divider} from "@material-ui/core";
import useStyle from './style.js';

import * as api from '../../api/index';
import ShowToast from "../ShowToast";
import {ERROR} from "../../store/types";
import {useHistory} from "react-router-dom";

const ForgetPassword = () => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isEmailCorrect, setIsEmailCorrect] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [tempEmail, setTempEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
         setTempEmail(email) //this is for sending email in OTP verification
        console.log(tempEmail);
        try {
            const {data} = await api.CheckUserExist(email);
            if(data === false){
                ShowToast(ERROR, "No user with this email exists!");
            }
            setEmail("");
            setIsEmailCorrect(data);
            triggerDisable();
        } catch (err) {
            const message = err.message || "Error in Sending Mail!";
            ShowToast(ERROR, message);
        }
    }

    const triggerDisable = () => {
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 120000);
    }

    const handleSubmitOTP = async(e) => {
        e.preventDefault();
        if(otp === "" || otp.length !== 6){
            ShowToast(ERROR, "Invalid OTP!Please try again.");
            return ;
        }
        try{
            //console.log(tempEmail);
            const { data } = await api.verifyOTP(tempEmail, otp);
            if(data === true){
                console.log("Redirecting to reset password.");
                history.push("/resetPassword");
            }else{
                ShowToast(ERROR, "Incorrect OTP!Please try again.");
            }
        }catch (e) {
            const message = e.message || "Error in verifying OTP!";
            ShowToast(ERROR, message);
        }
    }

    const classes = useStyle();
    return (
        <Paper elevation={7}>
            {!isEmailCorrect ? (
                <>
                    <div style={{textAlign: "center", padding: "5px"}}>
                        <Typography variant={"h6"}>Enter the registered email:</Typography>
                    </div>
                    <Divider/>
                    <form autoComplete={false} onSubmit={handleSubmit}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "5px",
                            margin: "5px 0"
                        }}>
                            <TextField
                                variant={"outlined"}
                                type={"email"}
                                label={"Email"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button className={classes.submitButton} variant={"contained"} type={"submit"}>
                                Send OTP
                            </Button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <div style={{textAlign: "center", padding: "5px"}}>
                        <Typography variant={"h6"}>Enter the OTP:</Typography>
                    </div>
                    <Divider/>
                    <form autoComplete={false} onSubmit={handleSubmitOTP}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "5px",
                            margin: "5px 0"
                        }}>
                            <TextField
                                variant={"outlined"}
                                label={"OTP"}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                                <Button className={classes.submitButton} variant={"contained"} type={"submit"}>
                                    Verify OTP
                                </Button>
                                <Button color={"secondary"} variant={"contained"} disabled={isButtonDisabled}
                                        onClick={() => {
                                        }}>
                                    Resend OTP
                                </Button>{ isButtonDisabled && ( <span>after 2 minutes...</span> ) }
                            </div>
                        </div>
                    </form>
                </>
            )}
        </Paper>
    );
};

export default ForgetPassword;