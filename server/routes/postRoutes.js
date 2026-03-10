import express from "express";
import { deleteController } from "../controllers/deleteController.js";
import { postController } from "../controllers/postController.js";

const Router = express.Router();

Router.post("/createpost", postController);

Router.delete("/deletepost", deleteController);

export default Router;
