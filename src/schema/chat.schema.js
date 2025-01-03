import mongoose from 'mongoose';


const chatData=mongoose.Schema({
    message:String,
    dateTime:String,
    userName:String,
    image:String,
    date:Date,
});


export const chatDb=mongoose.model("Chats",chatData);        