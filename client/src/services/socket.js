import { io } from "socket.io-client";

let socket;

function getSocket() {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL);
  }
  return socket;
}

export { getSocket };
