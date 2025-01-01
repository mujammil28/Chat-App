import express from 'express';
import UserController from './src/controller/user.controller.js'
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import { uploadFile } from './src/middlewares/multerMiddleware.js';
import { dbConnect } from './src/middlewares/mongodb.config.js';
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



app.get('/chat',userController.userChat)


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    }
});

io.on('connection',(socket)=>{

    console.log("Server socket connection established...")

   
   


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

        // const chatDataBase= new chatModel({
        //         userName:socket.userName,
        //         message:message,
        //         dateTime:new Date(),

        // })
       // console.log(userDetail)
        socket.broadcast.emit('send_message', userDetail);

    })


    socket.on('disconnect',()=>{

        console.error("Server socket connection disconnected!!!");

    })
}


)



app.all('*',userController.pageNotFound );

server.listen(3000,()=>{

        console.log("App is running on the port:3000");
        dbConnect();
})
