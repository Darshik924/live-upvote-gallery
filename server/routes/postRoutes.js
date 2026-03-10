import express from "express";
import { postController } from "../controllers/postController.js";

const Router = express.Router();

Router.get("/", (req, res) => {
  res.status(200).json({ TheHomePage: true });
});

Router.post("/create", postController);

export default Router;
