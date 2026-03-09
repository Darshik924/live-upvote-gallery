import express from "express";

const Router = express.Router();

Router.get("/", (req, res) => {
  res.status(200).json({ TheHomePage: true });
});

export default Router;
