import mongoose from "mongoose";

export const mongoConnect = async () =>{
    try {
        await mongoose.connect(process.env['MONGO_URI']||'');
      } catch (error: Error|any) {
        console.log(error.message)
        process.exit(0);
      }
}