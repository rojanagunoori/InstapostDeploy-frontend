import { io } from 'socket.io-client';

const URL =  'http://localhost:3000'|| "https://instapostdeploy-sever.onrender.com" || "wss://instapostdeploy-sever.onrender.com"
const socket = io(URL);

export default socket;
