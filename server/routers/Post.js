import express from "express";
import {
    deletePost,
    getPost,
    getPostBySearch,
    getPosts,
    likePost,
    postPosts,
    updatePost,
} from "../controllers/Post.js";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.route("/").get(getPosts).post(AuthMiddleware, postPosts);

router.route("/search").get(getPostBySearch);

router.route("/:id").patch(AuthMiddleware, updatePost).delete(AuthMiddleware, deletePost).get(getPost);

router.route("/:id/likePost").patch(AuthMiddleware, likePost);

export default router;
