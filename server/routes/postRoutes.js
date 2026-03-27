import express from "express";
import { deleteController } from "../controllers/deleteController.js";
import { postController } from "../controllers/postController.js";
import { upload } from "../middlewares/multer.js";

const Router = express.Router();

Router.post("/createpost", upload.single("img"), postController);
// Router.get('/getImage')
Router.delete("/deletepost", deleteController);

export default Router;
