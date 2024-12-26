export default class UserModel{


            constructor(id,name,email,mobile,password){

                    this.id=id;
                    this.name=name;
                    this.email=email;
                    this.mobile=mobile;
                    this.password=password;
                    
            }

            static addUser(name,email,mobile,password){
                const newUser=new UserModel(
                    users.length+1,
                    name,
                    email,
                    mobile,
                    password

                )

                users.push(newUser);
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


let users=[{ id: 1,name: 'abc',email:'abc@123.com',password:'1234'}];
