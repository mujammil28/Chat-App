export default class UserModel{


            constructor(id,name,email,image,password){

                    this.id=id;
                    this.name=name;
                    this.email=email;
                    this.image=image;
                    this.password=password;
                    
            }

            static addUser(name,email,image,password){
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
            }

            static loginValidator(email,password){

                    const result=users.find((u)=>{
                           return u.email===email && u.password===password;

                    })
                    console.log(result);
                        return result;
            }


}

//export const userDetails=newUser;
export let newUser = null;

let users=[{ id: 1,name: 'abc',email:'abc@123.com',password:'1234'}];
