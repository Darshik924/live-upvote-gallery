import { Server } from "socket.io";
import http from "http";

const ser = http.createServer(galleryApp);
const io = new Server(ser);

io.on("connection", (socket) => {
  console.log("User connected to the server");

  /* Here you will have to put socket.on('message', cb()); for recieving an emit message of like or dislike */
  /* You can also do socket.emit('ur-message', 'text-u-put'); for emitting or sending any message to the client */

  /* Do the same Stuff in the Frontend for emitting and receiving just remember for io use 
  const socket = io(); */

  socket.on("disconnect", () => {
    console.log("User disconnected from the server");
  });
});
