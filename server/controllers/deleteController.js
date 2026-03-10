import { doesImageExist, deletePost } from "../models/Post.js";

const deleteController = async (req, res, next) => {
  const { title, imageUrl } = req.body;

  if (!title || !imageUrl) {
    res.status(400).json({
      message: "All fields are required",
    });
  }

  if (!(await doesImageExist({ title, imageUrl }))) {
    res.status(400).json({ message: "Image does not exists" });
  }

  const image = await deletePost({ title, imageUrl });

  res.status(201).json({ message: "Image Successfully deleted" });
  next();
};

export { deleteController };
