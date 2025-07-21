const mongoose = require ("mongoose")

const db_connect = async()=>{
  console.log("data");

  console.log(process.env.MONGO_URI);

 try {
    await  mongoose.connect(process.env.MONGO_URI)
   console.log("✅ MongoDB connected");
    
 } catch (error) {
    console.error("❌ MongoDB connection error:", error);
 }
}

export default db_connect;