
import Hotel from "@/app/model/Hotel";
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
    const hotelId = params.id;
    console.log(hotelId);
    
    await db_connect();

    const formData = await req.formData();

    // Find hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return NextResponse.json({ error: "Hotel not found" }, { status: 404 });

    // ✅ Handle isActive toggle (optional)
    if (formData.has("isActive")) {
      const activeValue = formData.get("isActive");
      hotel.isActive = activeValue === "true" || activeValue === true;
    }

    // ✅ Handle hotel images
    const files = formData.getAll("hotelImage");
    if (files.length > 0) {
      // Delete old images
      if (hotel.hotelImage && hotel.hotelImage.length > 0) {
        for (const img of hotel.hotelImage) await deleteImage(img);
      }

      // Upload new images
      const uploadDir = path.join(process.cwd(), "public/uploads/hotels");
       await fs.mkdir(uploadDir, { recursive: true });

      const newImages = [];
      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;
        await fs.writeFile(path.join(uploadDir, fileName), buffer);
        newImages.push(`/uploads/hotels/${fileName}`);
      }
      hotel.hotelImage = newImages;
    }

    // ✅ Update only fields sent from frontend dynamically
    for (const [key, value] of formData.entries()) {
      if (key !== "hotelImage" && key !== "isActive") {
        hotel[key] = value;
      }
    }

    await hotel.save();

    return NextResponse.json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });

  } catch (err) {
    console.error("❌ Error updating hotel:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 📌 DELETE Hotel
export async function DELETE(req, { params }) {
  await db_connect();
  try {
    const hotel = await Hotel.findById(params.id);
    if (!hotel) return NextResponse.json({ error: "Hotel not found" }, { status: 404 });

    // Delete hotel images from folder
    if (hotel.hotelImage && hotel.hotelImage.length > 0) {
      for (const imgPath of hotel.hotelImage) {
        await deleteImage(imgPath);
      }
    }

    // Delete hotel document from DB
    await Hotel.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Hotel and its images deleted successfully" });

  } catch (err) {
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

    const hotel = await Hotel.findById(hotelId); // simple fetch

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json(hotel, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
