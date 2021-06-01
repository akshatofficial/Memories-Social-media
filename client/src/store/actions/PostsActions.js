import * as api from "../../api/index.js";
import {
    CREATE_POST,
    DELETE_POST, END_LOADING, ERROR,
    FETCH_ALL, FETCH_BY_SEARCH, FETCH_ONE,
    LIKE_POST, START_LOADING, SUCCESS,
    UPDATE_POST,
} from "../types.js";
import ShowToast from "../../components/ShowToast";

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPost(id);
        console.log(data);
        dispatch({type: FETCH_ONE, payload: {post: data}});
        dispatch({type: END_LOADING});
    } catch (e) {
        const message = e.message || "Error in Fetching Post!";
        ShowToast(ERROR, message);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts(page);
        //console.log(data);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    } catch (err) {
        const message = err.message || "Error in Fetching Posts!";
        ShowToast(ERROR, message);
    }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data: {data}} = await api.getPostBySearch(searchQuery);
        console.log(data);
        dispatch({type: FETCH_BY_SEARCH, payload: data});
        dispatch({type: END_LOADING});
    } catch (e) {
        const message = e.message || "Error in searching the post";
        ShowToast(ERROR, message);
    }
}

export const createPost = (newPost,history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const {data} = await api.createPost(newPost);
        //console.log(data);
        dispatch({type: CREATE_POST, payload: data});
        history.push(`/posts/${data._id}`);
        //dispatch({ type: END_LOADING });
        ShowToast(SUCCESS, "Memory created successfully!");
    } catch (err) {
        const message = err.message || "Error in Creating Post!";
        ShowToast(ERROR, message);
    }
};

export const updatePost = (currId, updatedPostData) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(currId, updatedPostData);
        dispatch({type: UPDATE_POST, payload: data});
        ShowToast(SUCCESS, "Memory Updated successfully!");
    } catch (err) {
        const message = err.message || "Error in Updating Post!";
        ShowToast(ERROR, message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE_POST, payload: id});
    } catch (err) {
        const message = err.message || "Error in Deleting Post!";
        ShowToast(ERROR, message);
        //console.log(err);
    }
};

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const {data} = await api.likePost(id, user?.token);
        //console.log(`data: ${data}`);
        dispatch({type: LIKE_POST, payload: data});
    } catch (err) {
        const message = err.message || "Error in liking the post.";
        ShowToast(ERROR, message);
    }
};
