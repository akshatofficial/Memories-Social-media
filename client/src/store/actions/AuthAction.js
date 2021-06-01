import * as api from '../../api/index.js';
import ShowToast from "../../components/ShowToast";
import {AUTH, ERROR, IS_USER_EXIST, SUCCESS} from "../types";

export const SignIn = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data});
        ShowToast(SUCCESS, "Welcome! Login successfully!");
        history.push("/");
    } catch (e) {
        //const message = e.message || "Error in signing in you!";
        const message = e.response.data.message || "Error in signing in you!";
        ShowToast(ERROR, message);
    }
}

export const SignUp = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.SignUp(formData);
        dispatch({type: AUTH, data});
        ShowToast(SUCCESS, "Welcome! You have registered successfully.");
        history.push("/");
    } catch (e) {
        //const message = e.message || "Error in signing up you!";
        const message = e.response.data.message || "Error in signing up you!";
        ShowToast(ERROR, message);
    }
}
