import {AUTH, IS_USER_EXIST, LOGOUT} from "../types";

const AuthReducer = (state = {authData: null, isEmailExist: false}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data}
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null}
        case IS_USER_EXIST:
            return {...state, isEmailExist: action.payload}
        default:
            return state;
    }
}

export default AuthReducer;