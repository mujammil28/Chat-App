import express from 'express';
import UserController from './src/controller/user.controller.js'
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import { uploadFile } from './src/middlewares/multerMiddleware.js';
import { dbConnect } from './src/middlewares/mongodb.config.js';
import { chatDb } from './src/schema/chat.schema.js';
import {auth} from './src/middlewares/auth.js'


const app=express();

const userController=new UserController();
app.use(bodyParser.json());

app.use(express.urlencoded({extended:true}));
app.set("view engine",'ejs');
app.set("views",path.join(path.resolve(),'src','views'))

app.use(express.static('media'));

const publicFold = path.resolve();
app.use(express.static(path.join(publicFold, 'public')));
app.use('/public',express.static(path.join(publicFold, 'public')));

app.use(express.static('src/views'));



app.get('/',(req, res)=>{

    res.sendFile(path.join(path.resolve(), 'public','   index.html'));
})

app.post('/login',userController.postLogin)

app.get('/login',userController.getUserLogin)



app.post('/register',uploadFile.single('image'),userController.addNewUser)

app.get('/register',userController.getUserRegister)



app.get('/chat',auth,userController.userChat)


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    }
});

io.on('connection',(socket)=>{

    console.log("Server socket connection established...")

    console.log(`New user connected: Socket ID - ${socket.id}`);

  // Notify all clients about the new connection
  io.emit('user_connected', { id: socket.id });



  chatDb.find().sort({date:1}).limit(50)
  .then(message=>{

      socket.emit("load_Messages", message);
   //   console.log(message)
  }).catch(err=>{
      console.log(err);
  })




    socket.on('new_message',(message)=>{
        const date=new Date();
                    const months = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
                    const day = date.getDate(); 
                    const month = months[date.getMonth()]; 
                    const year = date.getFullYear(); 
                    const hours = date.getHours(); 
                    const minutes = date.getMinutes(); 
            const dateTime=` ${year}, ${month} ${day},  ${hours}:${minutes}`;

        let userDetail={
          
            message:message.message,
            dateTime:dateTime,
            name:message.uName,
            image:message.image,
        }
        console.log(message)
        const chatDataBase= new chatDb({
                userName:message.uName,
                message:message.message,
                dateTime:message.dateTime,
                image:message.image,
        })


        chatDataBase.save();
       console.log(chatDataBase)
       

        socket.broadcast.emit('send_message', userDetail);

    })


    socket.on('disconnect',()=>{

        console.error("Server socket connection disconnected!!!");
        io.emit('user_disconnected', { id: socket.id });
    })
}


)



app.all('*',userController.pageNotFound );

server.listen(3000,()=>{

        console.log("App is running on the port:3000");
        dbConnect();
})
