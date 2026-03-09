import express from "express";
import router from "./routes/postRoutes.js";
import dotenv from "dotenv";
import { dbConnect } from "./db/dbConnection.js";
dotenv.config();

const galleryApp = express();
const port = process.env.PORT;
const dbUrl = process.env.Db_URL;
dbConnect(dbUrl);

galleryApp.use("/", router);

galleryApp.listen(port, () =>
  console.log(`Server is up for you ;) at ${port}`),
);
