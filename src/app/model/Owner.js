import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Full Name is mandatory"],
  },
    username: {
    type: String,
    unique: true,
    sparse: true, 
  },
  PropertyGST:{
    type:String,
    required: [true, "PropertyGST is mandatory"],
     
  },
   propertyName:{
    type: String,
    required: [true, "propertyName is mandatory"],

   },
   roomQuantity:{
       type:Number,
       required: [true, "roomQuantity is mandatory"],

   },
   startingPrice:{
    type:Number,
    required: [true, "startingPrice is mandatory"],
    
   }
   ,
  email: {
    type: String,
    required: [true, "Email Address is mandatory"],
    unique: true,
  },
    phone: {
    type: Number,
    default: "",
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "Owner", // "User" | "Owner" | "Admin"
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
    default: true, // enable by default
  },
});

export default mongoose.models.Owner || mongoose.model("Owner", OwnerSchema);
