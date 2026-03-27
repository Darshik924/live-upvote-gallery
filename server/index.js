import "./config/env.js";
/* In Order to always make sure to Load .env before anything else we use this way */

/*
Must Aviod:
1. All imports execute first 
2. cloudinary.js runs → process.env is undefined 
3. THEN dotenv.config() runs (too late) 
*/

import express from "express";
import router from "./routes/postRoutes.js";
import { dbConnect } from "./db/dbConnection.js";

const galleryApp = express();
const port = process.env.PORT;
const dbUrl = process.env.Db_URL;
dbConnect(dbUrl);

galleryApp.use(express.json());
galleryApp.use("/api", router);

galleryApp.listen(port, () =>
  console.log(`Server is up for you ;) at ${port}`),
);
export { galleryApp };
