import express from "express";
import { deleteController } from "../controllers/deleteController.js";
import { postController } from "../controllers/postController.js";
import { upload } from "../middlewares/multer.js";
import { getImagesControl } from "../controllers/getController.js"

const Router = express.Router();

Router.post("/createpost", upload.single("img"), postController);
Router.get("/posts", getImagesControl);
Router.delete("/deletepost", deleteController);

export default Router;
