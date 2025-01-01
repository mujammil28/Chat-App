import mongoose from 'mongoose';

const user=mongoose.Schema({

    name:String,
    email:String,
    password:String,
    image:String,
    date:Date,

})

export const userModel=mongoose.model("users",user)