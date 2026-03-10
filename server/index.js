import express from "express";
import router from "./routes/postRoutes.js";
import dotenv from "dotenv";
import { dbConnect } from "./db/dbConnection.js";

dotenv.config();

const galleryApp = express();
const port = process.env.PORT;
const dbUrl = process.env.Db_URL;
dbConnect(dbUrl);

galleryApp.use(express.json());
galleryApp.use("/api", router);

galleryApp.listen(port, () =>
  console.log(`Server is up for you ;) at ${port}`),
);

/* Socket IO Backend Stuff */

import { Server } from "socket.io";
import http from "http";

const ser = http.createServer(galleryApp);
const ioApp = new Server(ser);

ioApp.on("connection", (socket) => {
  console.log("User connected to the server");

  socket.on("disconnect", () => {
    console.log("User disconnected from the server");
  });
});
