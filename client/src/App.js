import React, {useEffect, useState} from "react";

import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import Header from "./components/Header/index.js";
import Home from "./components/Home/Home.js";

import {ToastContainer} from "react-toastify";
import {Container} from "@material-ui/core";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Auth from "./components/Auth";
import PostDetail from "./components/PostDetails/PostDetail.jsx";
import {useSelector} from "react-redux";
import ForgetPassword from "./components/ForgetPassword/index.js";
import ResetPassword from "./components/ResetPassword";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

const App = () => {
    //const user = JSON.parse(localStorage.getItem("profile"));
    const {isAuth} = useSelector(state => state.auth);

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Header/>
                <ToastContainer/>
                <Switch>
                    <Route
                        path={"/"}
                        exact
                        component={() => <Redirect to="/posts"/>}
                    />
                    <Route
                        path={"/auth"}
                        exact
                        component={() => (!isAuth ? <Auth/> : <Redirect to={"/posts"}/>)}
                    />
                    <Route
                        path={"/posts"}
                        exact
                        component={Home}
                    />
                    <Route
                        path={"/posts/search"}
                        exact
                        component={Home}
                    />
                    <Route
                        path={"/posts/:id"}
                        exact
                        component={PostDetail}
                    />
                    <Route
                        path={"/forgetPassword"}
                        exact
                        component={ForgetPassword}
                    />
                    <Route
                        path={"/resetPassword"}
                        exact
                        component={ResetPassword}
                    />
                </Switch>
                <Footer/>
                <ScrollToTop/>
            </Container>
        </BrowserRouter>
    );
};

export default App;
