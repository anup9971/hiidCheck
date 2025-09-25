import mongoose, { model } from "mongoose";

const roomSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  roomName: { type: String, required: true },
  roomPrice: { type: Number, required: true },
  roomQuantity: { type: Number, default: 0 },
  roomImage: [{ type: String }],
  propertyType: { type: String },
  roomAmenities: [{ type: String }],
  roomMap:{type : String },
  roomLocation:{ type: String},
  breakFast: { type: String },
  dinner: { type: String },
  room_description:{type: String},
  features: { parking: { type: Boolean, default: false }, restaurant: { type: Boolean, default: false } },
  isActive: { type: Boolean, default: true }, // admin toggle
}, { timestamps: true });

export default mongoose.models.Room || mongoose.model("Room",roomSchema)