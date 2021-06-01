import PostModel from "../models/Post.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const {page} = req.query;

        const limitPerPage = 6;
        const startingIndex = (Number(page) - 1) * limitPerPage; //This is starting index for each page
        const totalDocs = await PostModel.countDocuments({});

        const posts = await PostModel.find().sort({_id: -1}).limit(limitPerPage).skip(startingIndex);

        res.status(200).json({data: posts, currPage: Number(page), totalPages: Math.ceil(totalDocs / limitPerPage)});
    } catch (err) {
        res.send(404).json({message: err.message});
    }
};

export const getPostBySearch = async (req, res) => {
    try {

        const {searchQuery, tags} = req.query;

        const title = new RegExp(searchQuery, 'i');

        const posts = await PostModel.find({$or: [{title}, {tags: {$in: tags.split(",")}}]});

        res.status(200).json({data: posts});

    } catch (err) {
        res.send(400).json({message: err.message});
    }
}

export const getPost = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.send(404).message("No post exists!");
        }
        const post = await PostModel.findById(id);
        //console.log(post);
        res.status(200).json(post);
    } catch (e) {
        res.status(404).json({message: e.message});
    }
};

export const postPosts = async (req, res) => {
    const postData = req.body;
    const post = new PostModel({
        ...postData,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });
    try {
        await post.save();
        return res.status(201).json(post);
    } catch (err) {
        res.status(409).json({message: err.message});
    }
};

export const updatePost = async (req, res) => {
    const {id} = req.params;
    const {title, message, creator, selectedFile, tags} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with this id exists.");

    const updatedPostData = {
        title,
        message,
        creator,
        selectedFile,
        tags,
        _id: id,
    };

    const updatedPost = await PostModel.findByIdAndUpdate(
        id,
        {...updatedPostData},
        {
            new: true,
        }
    );

    res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with this id exists!");
    await PostModel.findByIdAndDelete(id);

    res.status(200).json({message: "Post Deleted Successfully!"});
};

export const likePost = async (req, res) => {
    const {id} = req.params;

    if (!req.userId) {
        return res.json({message: "Unauthenticated"});
    }

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with this id exists!");
    const post = await PostModel.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
        new: true,
    });

    res.status(200).json(updatedPost);
};
