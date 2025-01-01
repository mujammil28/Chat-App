import mongoose from "mongoose";


const url="mongodb://localhost:27017/chatter-up";

export const dbConnect=async()=>{
try{
    await mongoose.connect(url);
    console.log("Database Connected...");
}
catch(err){
    console.log("Error at database: "+err);
}

}

