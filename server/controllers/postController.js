import { doesImageExist, createPost } from "../models/Post.js";

const postController = async (req, res, next) => {
  const { title, imageUrl } = req.body;

  if (!title || !imageUrl) {
    res.status(400).json({
      message: "All fields are required",
    });
  }

  if (await doesImageExist({ title, imageUrl })) {
    res.status(400).json({ message: "Image exists" });
  }

  const image = await createPost({ title, imageUrl });

  res.status(201).json(image);
  next();
};

export { postController };
