
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Hotel from "@/app/model/Hotel"
import db_connect from "@/app/lib/db_connect";

// 📌 CREATE Hotel
export async function POST(req) {
  await db_connect();
  try {
    const formData = await req.formData();
    const ownerId = formData.get("ownerId")
    const hotel_name = formData.get("hotel_name");
    const hotel_Description = formData.get("hotel_Description");
    const starting_price = formData.get("starting_price");
    const rating = formData.get("rating");
    const hotel_address = formData.get("hotel_address");

    const files = formData.getAll("hotelImage");
    const imagePaths = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads/hotels");

      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      fs.writeFileSync(path.join(uploadDir, fileName), buffer);

      imagePaths.push(`/uploads/hotels/${fileName}`);
    }

    const hotel = await Hotel.create({
      hotel_name,
      ownerId,
      starting_price,
      hotel_Description,
      rating,
      hotel_address,
      hotelImage: imagePaths,
    });

    return NextResponse.json(hotel, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// 📌 READ Hotels (sirf active)
export async function GET() {
  await db_connect();
  try {
    const hotels = await Hotel.find({ isActive: true });
    return NextResponse.json(hotels);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
