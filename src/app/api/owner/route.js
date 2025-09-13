



import Owner from "@/app/model/Owner";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs/promises";
import db_connect from "@/app/lib/db_connect";

// export async function GET(req) {
//   await db_connect();
//   const owners = await Owner.find();
//   return NextResponse.json(owners);
// }

// export async function POST(req) {
//   await db_connect();
//   const body = await req.json();
//   const {
//     name,
//     email,
//     username,
//     password,
//     PropertyGST,
//     propertyName,
//     roomQuantity,
//     startingPrice,
//     phone,
//     address,
//     city,
//     state,
//     pin,
//     pic,
//     active
//   } = body;

//   // Check required fields
//   if (!name || !email || !password ) {
//     return NextResponse.json({ message: "All required fields must be provided" }, { status: 400 });
//   }

//   // Check if email already exists
//   const existingOwner = await Owner.findOne({ email });
//   if (existingOwner) return NextResponse.json({ message: "Owner already exists" }, { status: 400 });

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create owner
//   const owner = await Owner.create({
//     name,
//     email,
//     username,
//     password: hashedPassword,
//     PropertyGST,
//     propertyName,
//     roomQuantity,
//     startingPrice,
//     phone: phone || "",
//     address: address || "",
//     city: city || "",
//     state: state || "",
//     pin: pin || "",
//     pic: pic || "",
//     active: active !== undefined ? active : true
//   });

//   return NextResponse.json({ message: "Owner created successfully", owner }, { status: 201 });
// }


export async function POST(req) {
  try {
    await db_connect();
    console.log("✅ Already connected");

    const form = await req.formData();
    const name = form.get("name");
    const email = form.get("email");
    const username = form.get("username");
    const phone = form.get("phone");
    const password = form.get("password");
    const PropertyGST = form.get("PropertyGST");
    const propertyName = form.get("propertyName");
    const roomQuantity = form.get("roomQuantity");
    const startingPrice = form.get("startingPrice");
    const address = form.get("address");
    const city = form.get("city");
    const state = form.get("state") || "";
    const pin = form.get("pin") || "";
    const active = form.get("active") !== undefined ? form.get("active") === "true" : true;

    const file = form.get("pic");

    // Basic validation
    if (!name || !email || !password || !phone) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 });
    }

    // Check existing email
    const existingUser = await Owner.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Owner with this email already exists" }, { status: 400 });
    }

    // File upload
    let picPath = "";
    if (file && file.name && file.type.startsWith("image/")) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public/uploads/owner");

      // Create directory if not exists
      await fs.mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, buffer);
      picPath = `/uploads/owner/${fileName}`;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Owner
    const owner = await Owner.create({
      name,
      email,
      username,
      password: hashedPassword,
      PropertyGST: PropertyGST || "",
      propertyName: propertyName || "",
      roomQuantity: roomQuantity || "",
      startingPrice: startingPrice || "",
      phone: phone || "",
      address: address || "",
      city: city || "",
      state: state,
      pin: pin,
      pic: picPath,
      active,
    });

    return NextResponse.json({ message: "Owner created successfully", owner }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating owner:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}






export async function GET() {
  try {
    await db_connect();
    const users = await Owner.find();
    return NextResponse.json({ success: true, data: users });
  } catch (err) {
    console.error("GET users error:", err);
    return NextResponse.json({ success: false, msg: "Error fetching users" }, { status: 500 });
  }
}

