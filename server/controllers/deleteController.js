import { getImageUrl } from "../asset/imageHandler.js";
import { doesImageExist, deletePost } from "../models/Post.js";

const deleteController = async (req, res, next) => {
  const { title } = req.body;
  const filePath = req.file?.path;

  const imageUrl = await getImageUrl(filePath);
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
