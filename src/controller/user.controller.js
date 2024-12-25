

import UserModel from '../models/user.model.js';

export default class UserController{

            getUserLogin(req, res){  

                res.render('login')
            }

            postLogin(req,res){
                //console.log(req.body);
                const {email,password}=req.body;
             
                const user= UserModel.loginValidator(
                    email, password

                );


                if(!user){
                    return res.render('login', ()=>{
                     
                        res.send("user login failed!!!")
                });
                }

                     res.send("Login Successfull!!!");
                   //  res.render('dashboard')
            }


            getUserRegister(req, res){  

                res.render('register')
            }

            addNewUser(req,res){

                const {name,email,password}=req.body;

                const addUser=UserModel.addUser(name,email,password);
                res.render('login', { errorMessage: null });
               
            
            }

            userChat(req, res){
                    res.render('chat');
            }

            pageNotFound(req, res){
                res.render('404');
            }

}