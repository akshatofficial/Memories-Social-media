import React, {useEffect, useState} from "react";
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";

import {withRouter, Link, useHistory} from "react-router-dom";
import useStyle from "./style.js";
import memoriesText from "../../images/memories-text.png";
import memoriesLogo from '../../images/memories-logo.png';
import {useDispatch} from "react-redux";
import {LOGOUT} from "../../store/types";
import decode from 'jwt-decode';

const Header = (props) => {
    const classes = useStyle();

    const history = useHistory();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const dispatch = useDispatch();
    //console.log(history);
    const location = history.location.pathname;

    const logout = () => {
        dispatch({type: LOGOUT});
        history.push("/auth");
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        //JWT...
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);


    return (
        <>
            <AppBar
                className={classes.appBar}
                position="static"
                variant="elevation"
                color="inherit"
            >
                <Link to={"/"} className={classes.brandContainer}>
                    <img
                        src={memoriesText}
                        alt={"icon"}
                        height={"45px"}
                    />
                    <img
                        src={memoriesLogo}
                        alt="memoriesLogo"
                        height="40"
                        className={classes.image}
                    />
                </Link>
                <Toolbar className={classes.toolbar}>
                    {
                        user ? (
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.purple}
                                    alt={user.result.name}
                                    src={user.result.imageUrl}
                                >{user.result.name.charAt(0)}</Avatar>
                                <Typography
                                    variant={"h6"}
                                    className={classes.userName}>
                                    {user.result.name}
                                </Typography>
                                <Button variant={"contained"} className={classes.logout}
                                        color={"secondary"} onClick={logout}>Logout</Button>
                            </div>
                        ) : (
                            <Button component={Link} to={"/auth"} variant={"contained"} color={"primary"}>Login</Button>
                        )
                    }
                </Toolbar>
            </AppBar>
        </>
    );
};

export default withRouter(Header);
