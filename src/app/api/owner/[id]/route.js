import db_connect from "@/app/lib/db_connect";
import Owner from "@/app/model/Owner";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// GET single user by ID
export async function GET(req, { params }) {
  await db_connect()
  const user = await Owner.findById(params.id);
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}

// PUT - update user by ID
// export async function PUT(req, { params }) {
//   await db_connect()
//   const body = await req.json();
//   const user = await Owner.findById(params.id);
//   if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

//   const fields = ["name","username","email","phone","address","city","state","pin","active"];
//   fields.forEach(f => { if (body[f] !== undefined) user[f] = body[f]; });

//   await user.save();
//   return NextResponse.json({ message: "User updated successfully", user });
// }

export async function PUT(req, { params }) {
  await db_connect();
  const body = await req.json();
  const user = await Owner.findById(params.id);

  if (!user) 
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  // normal fields update
  const fields = ["name","username","email","phone","address","city","state","pin","active"];
  fields.forEach(f => { 
    if (body[f] !== undefined) user[f] = body[f]; 
  });

  // ✅ password update
  if (body.password) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    user.password = hashedPassword;
  }

  await user.save();

  return NextResponse.json({ message: "User updated successfully", user });
}

// DELETE - delete user by ID
export async function DELETE(req, { params }) {
  await db_connect()
  const user = await Owner.findById(params.id);
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  await Owner.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "User deleted successfully" });
}
