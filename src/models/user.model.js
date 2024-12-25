export default class UserModel{


            constructor(id,name,email,password){

                    this.id=id;
                    this.name=name;
                    this.email=email;
                    this.password=password;
                    
            }

            static addUser(name,email,password){
                const newUser=new UserModel(
                    users.length+1,
                    name,
                    email,
                    password

                )

                users.push(newUser);
            }

            static loginValidator(email,password){

                    const result=users.find((u)=>{
                           return u.email===email && u.password===password;

                    })
                    console.log(result);
                        return result;
            }


}


let users=[{email:'abc@123.com',password:'1234'}];