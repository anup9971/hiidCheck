import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full Name is mandatory"],
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: [true, "Email Address is mandatory"],
      unique: true,
    },
    phone: {
      type: Number,
      
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "User", // "User" | "Owner" | "Admin"
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pin: {
      type: String,
      default: "",
    },
    otp: {
      type: Number,
      default: -2334465678,
    },
    pic: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // ✅ yaha se createdAt & updatedAt auto generate hoga
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
