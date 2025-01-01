import { userModel } from "../schema/user.schema.js";

export default class UserModel{


            constructor(id,name,email,image,password){

                    this.id=id;
                    this.name=name;
                    this.email=email;
                    this.image=image;
                    this.password=password;
                    
            }

            static async addUser(name,email,image,password){
                const newUser=new UserModel(
                    users.length+1,
                    name,
                    email,
                    image,
                    password

                )

                
                users.push(newUser);
                global.newUser = newUser;
                console.log(users);
                
                const userDb=new userModel({
                    name,
                    email,
                    image,
                    password,
                    date:new Date(),
                }) 

               await userDb.save();
            }

            // static loginValidator(email,password){

            //     const result=users.find((u)=>{
            //         return u.email===email && u.password===password;

            //  })
             
       
    
            //   return result;
    
    
    
            // }
            static async loginValidator(email, password) {
                try {
                    // Find the user in MongoDB
                    const user = await userModel.findOne({ email, password });
                    if (user) {
                        console.log("User found:", user);
                        return user;
                    } else {
                        
                        console.log("User not found or invalid credentials");
                        return null;
                    }
                } catch (error) {
                    console.error("Error finding user:", error);
                    throw error;
                }
            }


}

//export const userDetails=newUser;
export let newUser = null;

let users=[{ id: 1,name: 'abc',email:'abc@123.com',image:'images/UserImg-1735750597533-Screenshot 2024-07-09 151919.png',password:'1234'},
    {id:2,name:"testing",email:"test@1234.com",password:"1111",image:"images/UserImg-1735748081571-Picsart_24-08-06_13-22-56-864.jpg"
}
];
