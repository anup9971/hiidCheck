
import User from "@/app/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db_connect from "@/app/lib/db_connect";

// GET all users
export async function GET(req) {
  await  db_connect()
  const users = await User.find();
  return NextResponse.json(users);
}

// POST - create/register new user
export async function POST(req) {
  await db_connect()
  const body = await req.json();
  const { name, email, username, password } = body;

  if (!name || !email || !password)
    return NextResponse.json({ message: "All fields required" }, { status: 400 });

  const existingUser = await User.findOne({ email });
  if (existingUser) return NextResponse.json({ message: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, username, password: hashedPassword });

  return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
}
