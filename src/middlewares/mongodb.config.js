import mongoose from "mongoose";


const url="mongodb+srv://mujammil28012002:QAXq7bJ5qxSAqw8z@usercluster.d8xpj.mongodb.net/?retryWrites=true&w=majority&appName=UserCluster";

export const dbConnect=async()=>{
try{
    await mongoose.connect(url);
    console.log("Database Connected...");
}
catch(err){
    console.log("Error at database: "+err);
}

}

