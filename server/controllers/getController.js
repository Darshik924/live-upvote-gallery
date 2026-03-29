import { allPostsGet } from "../models/Post.js";

const getImagesControl = async (req, res) => {
  const requirement = await allPostsGet();

  if (!requirement || requirement.length === 0) {
    return res.status(200).json([]);
  }

  res.status(200).json(requirement);
};

export { getImagesControl };
