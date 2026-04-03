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
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import postModel from "./models/Post.js";

const galleryApp = express();
const ser = http.createServer(galleryApp); // Wrapping express in http server
const io = new Server(ser, {
  cors: { origin: "*" },
});

const port = process.env.PORT;
const dbUrl = process.env.Db_URL;

galleryApp.use(
  cors({
    origin: [`${process.env.FT_URL}`, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

dbConnect(dbUrl);

galleryApp.use(express.json());
galleryApp.use("/api", router);

/* Socket IO Updatation Logics */

io.on("connection", (socket) => {
  console.log("User connected to the server");

  /* Here you will have to put socket.on('message', cb()); for recieving an emit message of like or dislike */
  /* You can also do socket.emit('ur-message', 'text-u-put'); for emitting or sending any message to the client */
  socket.on("message", (message) => console.log(message));

  socket.on("post:upvote", async ({ postId }) => {
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { $inc: { upvotes: 1 } },
      { new: true },
    );
    /*  We are using a MongoDB operator that means "increment". So it takes the current upvotes value in the DB and adds 1 to it automatically — meaning even if 100 users click upvote at the same time, each increment happens safely one at a time, no count gets lost. */
    if (!updatedPost) {
      console.log("Post not found:", postId);
      return; // or emit an error back to client
    }

    io.emit("post:upvoteSync", {
      postId,
      upvotes: updatedPost.upvotes,
    });
  });

  /* Do the same Stuff in the Frontend for emitting and receiving just remember for io use 
  const socket = io(); */

  socket.on("disconnect", () => {
    console.log("User disconnected from the server");
  });
});

/* Socket Logics END */

ser.listen(port, "0.0.0.0", () => console.log(`Server is up at ${port}`));
export { galleryApp };
