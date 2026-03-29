import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  imageUrl: { type: String, unique: true },
  upvotes: { type: Number, default: 0 },
});

const postModel = mongoose.model("Post", postSchema);

const createPost = async ({ title, imageUrl }) => {
  try {
    const m = {
      title,
      imageUrl,
      upvotes: 0,
    };

    postModel.insertOne(m);
    return m;
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async ({ title, imageUrl }) => {
  try {
    const post = await postModel.findOne({ title: title, imageUrl: imageUrl });
    await postModel.deleteOne(post);

    return post;
  } catch (err) {
    console.log(err);
  }
};

const doesImageExist = async ({ imageUrl }) => {
  try {
    const post = await postModel.findOne({ imageUrl: imageUrl });

    if (post) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const allPostsGet = async () => {
  try {
    const imagesArr = await postModel.find().sort({ createdAt: -1 });
    return imagesArr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { doesImageExist, createPost, deletePost, allPostsGet };
export default postModel;
