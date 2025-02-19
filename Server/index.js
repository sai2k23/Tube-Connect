import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import videoroutes from './Routes/video.js'
import userroutes from "./Routes/User.js"
import shareRoutes from "./Routes/shareRoutes.js";
import path from 'path'
import notificationRoutes from "./Routes/notificationRoutes.js";
import commentroutes from './Routes/comment.js';
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config()
const app = express()
const httpServer = createServer(app); // Wrap express with HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    },
});
app.use(cors())


app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(bodyParser.json());
app.use('/uploads',express.static(path.join('uploads')))


app.get('/',(req,res)=>{
    res.send("You tube is working")
})
app.use((req, res, next) => {
    req.io = io; // Attach Socket.IO instance to req object
    next();
});
// ✅ Define Routes AFTER attaching `req.io`
app.use(bodyParser.json())
app.use('/user', userroutes)
app.use('/video', videoroutes)
app.use('/comment',commentroutes)
app.use("/", shareRoutes);
app.use("/api/notifications", notificationRoutes);

// ✅ Socket.IO Handling (Join Room using receiverEmail)
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", (email) => {
        socket.join(email); // Users join room with their email
        console.log(`User with email ${email} joined room`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL).then(()=>{
    console.log("Mongodb Database connected")
    httpServer.listen(PORT, () => {
        console.log(`Server running on Port ${PORT}`);
    });
}).catch((error)=>{
    console.log(error)
})