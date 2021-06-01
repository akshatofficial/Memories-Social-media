import React, {useState} from 'react';

import {Paper, Grid, Button, Avatar, Typography, Container} from '@material-ui/core';
import {LockOutlined} from "@material-ui/icons";

import useStyle from './style';
import Icon from './Icon';
import Input from "./input";

import {GoogleLogin} from 'react-google-login';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AUTH, ERROR, SUCCESS} from "../../store/types";

import ShowToast from "../ShowToast";
import {SignIn, SignUp} from "../../store/actions/AuthAction";

const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const Auth = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    const classes = useStyle();
    const [showPass, setShowPass] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(formData);

        if (isSignUp) {
            dispatch(SignUp(formData, history));
        } else {
            dispatch(SignIn(formData, history));
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleShowPassword = () => {
        setShowPass((prevState) => !prevState);
    }

    const handleSwitch = () => {
        setIsSignUp((prevState => !prevState))
    }

    const handleGoogleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: AUTH, data: {result, token}});
            ShowToast(SUCCESS, "Welcome! Login Successfully!");
            history.push("/");
        } catch (e) {
            const message = e.message || "Oops! Something went wrong.";
            ShowToast(ERROR, message);
        }

    }

    const handleGoogleFailure = () => {
        const message = "Error in sign in with Google.";
        console.log(message);
        ShowToast(ERROR, message);
    }

    return (
        <>
            <Container maxWidth={"xs"} component={"main"}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined/>
                    </Avatar>
                    <Typography variant={"h5"}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} autoComplete={false}>
                        <Grid container spacing={2}>
                            {
                                isSignUp && (
                                    <>
                                        <Input
                                            name={"firstName"}
                                            label={"First Name"}
                                            half={true}
                                            autoFocus
                                            handleChange={handleChange}
                                        />
                                        <Input
                                            name={"lastName"}
                                            label={"Last Name"}
                                            half={true}
                                            handleChange={handleChange}
                                        />
                                    </>
                                )
                            }
                            <Input
                                name={"email"}
                                label={"Email"}
                                half={false}
                                type={"email"}
                                handleChange={handleChange}
                            />
                            <Input
                                name={"password"}
                                label={"Password"}
                                half={false}
                                type={showPass ? "text" : "password"}
                                handleChange={handleChange}
                                handleShowPassword={handleShowPassword}
                            />
                            {
                                isSignUp && (
                                    <Input
                                        name={"confirmPassword"}
                                        label={"Confirm Password"}
                                        handleChange={handleChange}
                                        handleShowPassword={handleShowPassword}
                                        type={showPass ? "text" : "password"}
                                    />
                                )
                            }
                        </Grid>
                        <GoogleLogin
                            clientId={"154770653971-1eonosg35b389cmeu7t4irjlp5ro167v.apps.googleusercontent.com"}
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color={"primary"}
                                    variant={"contained"}
                                    fullWidth={true}
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon/>}
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={handleGoogleSuccess}
                            onFailure={handleGoogleFailure}
                            cookiePolicy={"single_host_origin"}
                        />
                        <Button className={classes.submit} variant={"contained"} color={"primary"} type={"submit"}
                                fullWidth={true}>
                            {
                                isSignUp ? "Sign Up" : "Login"
                            }
                        </Button>
                        <Button className={classes.submit} onClick={handleSwitch}
                                fullWidth={true}>
                            {
                                isSignUp ? "Already have an account? Sign In here." : "Dont have an account? Sign Up here."
                            }
                        </Button>
                        {!isSignUp && (
                            <Button onClick={() => history.push("/forgetPassword")} fullWidth={true}>
                                Forgot Password? Click here.
                            </Button>
                        )}
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default Auth;