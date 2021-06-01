import {
    CREATE_POST,
    DELETE_POST, END_LOADING,
    FETCH_ALL, FETCH_BY_SEARCH, FETCH_ONE,
    LIKE_POST, START_LOADING,
    UPDATE_POST,
} from "../types.js";

const PostsReducer = (state = {isLoading: true, posts: []}, action) => {
    switch (action.type) {
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currPage: action.payload.currPage,
                totalPages: action.payload.totalPages
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            }
        case FETCH_ONE:
            return {
                ...state,
                post: action.payload.post
        }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    (post._id === action.payload._id ? action.payload : post)
                )
            }
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    (post._id === action.payload._id ? action.payload : post)
                )
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload)
            }
        case START_LOADING:
            return {...state, isLoading: true}
        case END_LOADING:
            return {...state, isLoading: false}
        default:
            return state;
    }
};

export default PostsReducer;
