import { io } from "socket.io-client";

let socket;

function getSocket() {
  if (!socket) {
    socket = io("http://localhost:8889");
  }
  return socket;
}

export { getSocket };
