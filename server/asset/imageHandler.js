import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const getImageUrl = async (filePath) => {
  console.log(cloudinary.config());
  try {
    const result = await cloudinary.uploader.upload(filePath);

    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (err) {
    console.error("CLoudinary Error:", err);
    throw new Error("Image upload failed");
  }
};

export { getImageUrl };
