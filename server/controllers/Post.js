import PostModel from "../models/Post.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.send(404).json({ message: err.message });
  }
};

export const postPosts = async (req, res) => {
  const post = new PostModel(req.body);
  try {
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with this id exists.");
  const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with this id exists!");
  await PostModel.findByIdAndDelete(id);

  res.status(200).json({ message: "Post Deleted Successfully!" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with this id exists!");
  const post = await PostModel.findById(id);
  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    { likes: post.likes + 1 },
    { new: true }
  );

  res.status(200).json(updatedPost);
};
