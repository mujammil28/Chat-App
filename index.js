import express from 'express';
import UserController from './src/controller/user.controller.js'
import path from 'path';


const app=express();

const userController=new UserController();

app.set("view engine",'ejs');
app.set("views",path.join(path.resolve(),'src','views'))





app.get('/',(req, res)=>{

    res.send("App running");
})

app.get('/login',userController.getUserLogin)







app.listen(3000,()=>{

        console.log("App is running on the port:3000");

})
