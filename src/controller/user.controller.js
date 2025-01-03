

import UserModel from '../models/user.model.js';
import { userModel } from '../schema/user.schema.js';
export default class UserController{
    constructor() {}
            getUserLogin(req, res){  

                res.render('login', { errorMessage: null }); 
            }

            async postLogin(req, res) {
                try {
                    const { email, password } = req.body;
                    console.log(req.body);
        
                    // Validate user using the database
                    const user = await UserModel.loginValidator(email, password);
        
                    if (user) {
                        // If user is found, render the chat view
                        const users = await userModel.find(); 
                        return res.render('chat', { user,users });
                    } else {
                        // If validation fails, reload the login page with an error message
                        return res.render('login', { errorMessage: 'Invalid email or password' });
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                    res.status(500).send('Internal Server Error');
                }
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