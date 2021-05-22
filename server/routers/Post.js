import express from "express";
import {
  deletePost,
  getPosts,
  likePost,
  postPosts,
  updatePost,
} from "../controllers/Post.js";

const router = express.Router();

router.route("/").get(getPosts).post(postPosts);

router.route("/:id").patch(updatePost).delete(deletePost);

router.route("/:id/likePost").patch(likePost);

export default router;
