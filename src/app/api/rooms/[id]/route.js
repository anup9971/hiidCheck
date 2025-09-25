
import Room from "@/app/model/Room";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import db_connect from "@/app/lib/db_connect";

// 📌 UPDATE Hotel





async function deleteImage(filePath) {
  try {
    const fullPath = path.join(process.cwd(), "public", filePath);
    await fs.unlink(fullPath);
  } catch (err) {
    console.warn("⚠️ Failed to delete:", filePath, err.message);
  }
}

export async function PUT(req, { params }) {
  try {
    const roomId = params.id;
    await db_connect();

    const formData = await req.formData();

    // Find room by ID
    const room = await Room.findById(roomId);
    if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });

    // ✅ Handle isActive toggle
    if (formData.has("isActive")) {
      const activeValue = formData.get("isActive");
      room.isActive = activeValue === "true" || activeValue === true;
    }

    // ✅ Handle room images
    const files = formData.getAll("roomImage");
    if (files.length > 0) {
      // Delete old images
      if (room.roomImage && room.roomImage.length > 0) {
        for (const img of room.roomImage) {
          await deleteImage(img);
        }
      }

      // Upload new images
      const uploadDir = path.join(process.cwd(), "public/uploads/rooms");
      await fs.mkdir(uploadDir, { recursive: true });

      const newImages = [];
      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);
        newImages.push(`/uploads/rooms/${fileName}`);
      }
      room.roomImage = newImages; // replace old images with new
    }

    // ✅ Update other fields dynamically
    for (const [key, value] of formData.entries()) {
      if (key === "roomImage" || key === "isActive") continue;

      if (key === "roomAmenities") {
        // Convert comma-separated string to array
        room.roomAmenities = value.split(",").map(item => item.trim());
      } else if (key === "features") {
        // Parse JSON string for features
        try {
          room.features = JSON.parse(value);
        } catch {
          // ignore invalid JSON
        }
      } else {
        room[key] = value;
      }
    }

    await room.save();

    return NextResponse.json({
      success: true,
      message: "Room updated successfully",
      data: room,
    });
  } catch (err) {
    console.error("❌ Error updating room:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// 📌 DELETE Hotel
export async function DELETE(req, context) {
  const { params } = context;  // destructure properly
  const roomId = params.id;    // ab safe
  try {
    await db_connect();

    // Find room
    const room = await Room.findById(params.id);
    if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });

    // Delete all images from disk
    if (room.roomImage && room.roomImage.length > 0) {
      for (const img of room.roomImage) {
        await deleteImage(img);
      }
    }

    // Delete room from DB
    await Room.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Room and its images deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting room:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



export async function GET(req, { params }) {
  try {
    await db_connect();
    
    const hotelId = params.id;

    // Hotel fetch karna
    // Agar tumhe rooms bhi chahiye aur hotel me roomIds rakhte ho:
    // const hotel = await Hotel.findById(hotelId).populate("roomIds");

    const hotel = await Room.findById(hotelId); // simple fetch

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json(hotel, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
