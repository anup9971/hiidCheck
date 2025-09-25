
// 📌 CREATE Hotel
import { NextResponse } from "next/server";
import db_connect from "@/app/lib/db_connect"
import Room from "@/app/model/Room"
import path from "path";
import fs from "fs";

export async function POST(req) {
  await db_connect();

  try {
    const formData = await req.formData();

    // Required fields
    const hotelId = formData.get("hotelId");
    const roomName = formData.get("roomName");
    const roomPrice = Number(formData.get("roomPrice"));
    const roomQuantity = Number(formData.get("roomQuantity")) || 0;
    const propertyType = formData.get("propertyType") || "";

    // Optional fields
    const roomAmenities = formData.get("roomAmenities")
      ? JSON.parse(formData.get("roomAmenities"))
      : [];
    const roomMap = formData.get("roomMap") || "";
    const roomLocation = formData.get("roomLocation") || "";
    const breakFast = formData.get("breakFast") || "";
    const dinner = formData.get("dinner") || "";
    const room_description = formData.get("room_description") || "";
    const features = formData.get("features")
      ? JSON.parse(formData.get("features"))
      : { parking: false, restaurant: false };
    const isActive = formData.get("isActive") === "false" ? false : true;

    // Handle images
    const files = formData.getAll("roomImage");
    const imagePaths = [];
    if (files.length > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads/rooms");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;
        fs.writeFileSync(path.join(uploadDir, fileName), buffer);
        imagePaths.push(`/uploads/rooms/${fileName}`);
      }
    }

    // Create Room document
    const room = await Room.create({
      hotelId,
      roomName,
      roomPrice,
      roomQuantity,
      propertyType,
      roomAmenities,
      roomMap,
      roomLocation,
      breakFast,
      dinner,
      room_description,
      features,
      isActive,
      roomImage: imagePaths,
    });

    return NextResponse.json({ success: true, data: room }, { status: 201 });
  } catch (err) {
    console.error("❌ Error creating room:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}


// 📌 READ Hotels (sirf active)
export async function GET() {
  await db_connect();
  try {
    const room = await Room.find({ isActive: true });
    return NextResponse.json(room);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
