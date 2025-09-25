import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  hotel_name: { type: String, required: true },
  hotel_address: { type: String },
  hotel_Description: { type: String },
  starting_price: { type: Number },
  rating: { type: Number, default: 0 },
  hotelImage: [{ type: String }],
  roomIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  isActive: { type: Boolean, default: true }, // admin toggle
}, { timestamps: true });


export default mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
