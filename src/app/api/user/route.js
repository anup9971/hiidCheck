



import { NextResponse } from "next/server";
import User from "@/app/model/User";
import db_connect from "@/app/lib/db_connect";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// export async function POST(req) {
//   await db_connect();

//   const form = await req.formData();
//   const name = form.get("name");
//   const email = form.get("email");
//   const username = form.get("username");
//   const phone = form.get("phone");
//   const password = form.get("password");
//   const file = form.get("pic");

//   if (!name || !email || !password ||!phone) {
//     return NextResponse.json({ message: "All fields required" }, { status: 400 });
//   }

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return NextResponse.json({ message: "User already exists" }, { status: 400 });
//   }

//   // ✅ Save pic inside /uploads/user/
//   let picPath = "";
//   if (file && file.name) {
//     const buffer = Buffer.from(await file.arrayBuffer());
//     const uploadDir = path.join(process.cwd(), "public/uploads/user");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//     const fileName = `${Date.now()}-${file.name}`;
//     const filePath = path.join(uploadDir, fileName);

//     fs.writeFileSync(filePath, buffer);
//     picPath = `/uploads/user/${fileName}`;
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await User.create({
//     name,
//     email,
//     username,
//     password: hashedPassword,
//     pic: picPath,
//   });

//   return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
// }


export async function POST(req) {
  await db_connect();

  const form = await req.formData();
  const name = form.get("name");
  const email = form.get("email");
  const username = form.get("username");
  const phone = form.get("phone");
  const password = form.get("password");
  const file = form.get("pic");

  if (!name || !email || !password || !phone) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  // File upload
  let picPath = "";
  if (file && file.name && file.type.startsWith("image/")) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads/user");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);
    picPath = `/uploads/user/${fileName}`;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    username,
    phone,
    password: hashedPassword,
    pic: picPath,
  });

  return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
}


export async function GET() {
  try {
    await db_connect();
    const users = await User.find();
    return NextResponse.json({ success: true, data: users });
  } catch (err) {
    console.error("GET users error:", err);
    return NextResponse.json({ success: false, msg: "Error fetching users" }, { status: 500 });
  }
}