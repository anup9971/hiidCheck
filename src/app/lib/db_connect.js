// import mongoose from "mongoose";


// const db_connect = async () => {
//   // console.log("Connecting to MongoDB...");
//   // console.log(process.env.MONGO_URI);

//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       dbName: "hotelindelhi", // ✅ Add this line
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     // console.log("✅ MongoDB connected");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//   }
// };

// export default db_connect;



import mongoose from "mongoose";

let isConnected = false; // track connection

const db_connect = async () => {
  if (isConnected) {
    console.log("✅ Already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected:", conn.connection.host, "/", conn.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};

export default db_connect;

