import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"})

//const fetchPostsURL = "http://localhost:5000/posts";

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})

/*************For Posts*********/
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPostData) => API.patch(`/posts/${id}`, updatedPostData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const getPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`)
export const fetchPost = (id) => API.get(`/posts/${id}`);

/************For Auth*********/
export const signIn = (formData) => API.post("/users/signIn", formData);
export const SignUp = (formData) => API.post("/users/signUp", formData);
export const CheckUserExist = (email) => API.post("/users/isUserExist", {email});
export const verifyOTP = (tempEmail, otp) => API.post("/users/isValidOtp", {otp, email: tempEmail});
export const ResetPassword = (email, password) => API.post("/users/resetPassword", { email, password });
