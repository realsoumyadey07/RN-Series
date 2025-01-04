require("dotenv").config();
import mongoose from "mongoose";


export const connectDb = async()=> {
     try {
          const res = await mongoose.connect(process.env.DB_URL || "");
          if(res){
               console.log(`DB is connected to`);
          }
     } catch (error: any) {
          console.log("Error while connecting db: ", error.message);
     }
}