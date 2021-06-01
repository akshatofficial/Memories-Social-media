import {combineReducers} from "redux";
import posts from '../reducers/PostsReducer.js';
import auth from '../reducers/AuthReducer.js';

export default combineReducers({
    posts,
    auth
});
