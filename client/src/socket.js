import { io } from "socket.io-client";

// Connect to your backend URL
const socket = io("http://localhost:5000"); 

export default socket;
