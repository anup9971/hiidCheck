const mongoose = require("mongoose");

const db_connect = async () => {
  // console.log("Connecting to MongoDB...");
  // console.log(process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "hotelindelhi", // ✅ Add this line
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default db_connect;
