import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import path from "path";


// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js' 
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'

const app = express();


// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use(express.static(path.join(__dirname, '../../client/build'))) ;
// app.get('*' ,function(req,res){
//     res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

//Route
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)



// Connection to Database
dotenv.config();
const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.MONGO_DB ;

mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION ,  {useNewUrlParser: true} )
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


  import { Server } from "socket.io";
  const io = new Server(process.env.SocketPORT||8800,{
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
 
  let activeUsers = [];
  
  io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });
  
    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });
  
    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });
  });
  
