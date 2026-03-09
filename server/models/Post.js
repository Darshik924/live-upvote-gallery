import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  imageUrl: { type: String, unique: true },
  upvotes: { type: Number, default: 0 },
});

const postModel = mongoose.Model("Post", postSchema);

export default postModel;

const createPost=async ({title,imageUrl}) => {
    try{
        const m={
            title,
            imageUrl,
            upvotes:0,
        }
    }catch(err){
        
    }
}