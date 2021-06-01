import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  name: String,
  creator: String,
  message: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
      type: Date,
      default: new Date()
  }
});

const PostModel = mongoose.model("PostModel", postSchema);

export default PostModel;
