import express from 'express';
import UserController from './src/controller/user.controller.js'
import path from 'path';
import bodyParser from 'body-parser';

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


app.get('/',(req, res)=>{

    res.sendFile(path.join(path.resolve(), 'public','   index.html'));
})

app.post('/login',userController.postLogin)

app.get('/login',userController.getUserLogin)



app.post('/register',userController.addNewUser)

app.get('/register',userController.getUserRegister)

app.get('/chat',userController.userChat)


app.use(express.static('src/views'));



app.all('*',userController.pageNotFound );

app.listen(3000,()=>{

        console.log("App is running on the port:3000");

})
