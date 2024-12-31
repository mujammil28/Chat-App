

import UserModel from '../models/user.model.js';

export default class UserController{

            getUserLogin(req, res){  

                res.render('login')
            }

            postLogin(req,res){
                //console.log(req.body);
                const {email,password}=req.body;
                console.log(req.body)
                const user= UserModel.loginValidator(
                    email, password

                );


                if(user){
                    return res.render('chat',{user:user});
                }else{
                    return res.render('login');
                }

               


                   //  res.render('dashboard')
            }


            getUserRegister(req, res){  

                res.render('register')
            }

            addNewUser(req,res){

                const {name,email,password}=req.body;
                console.log(req.file); // Should log file details
                if (!req.file) {
                    return res.status(400).send('File not uploaded');
                }
                const image="images/"+req.file.filename;
                UserModel.addUser(name,email,image,password);
                
                res.render('login', { errorMessage: null });
               
            
            }

            userChat(req, res){
                    res.render('chat');
            }

            pageNotFound(req, res){
                res.render('404');
            }

}