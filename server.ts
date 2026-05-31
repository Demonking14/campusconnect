import { createServer } from "http";
import {Server} from 'socket.io'
import next from 'next'

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const httpServer = createServer((req, res)=>{
        handle(req, res);
    });
    const io = new Server(httpServer , {
        cors:{
            origin:"*",
            methods:["GET" , "POST"],
        },
    });
    io.on("connection" , (socket)=>{
        console.log("User connected: ", socket.id);

        socket.on("join-room" , (roomId: string)=>{
            socket.join(roomId);
            console.log( `Socket ${socket.id} joined room ${roomId}`);
        });

        socket.on("send-msg" , (data : {
            roomId:string,
            msg:string;
            sender:string;
            sendername:string;
            avatar:string;
            timestamp:string
        })=>{
            io.to(data.roomId).emit("receive-msg", data);
        });

        socket.on("disconnect" , ()=>{
            console.log("User disconnected: ", socket.id);
        });
    });
    httpServer.listen(3000 , ()=>{
        console.log("Server running on http://localhost:3000");
    });
});
