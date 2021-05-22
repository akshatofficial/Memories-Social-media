import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  creator: String,
  message: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
      type: Date,
      default: new Date()
  }
});

const PostModel = mongoose.model("PostModel", postSchema);

export default PostModel;
