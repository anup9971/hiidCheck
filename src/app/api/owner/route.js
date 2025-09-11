
// import Owner from "@/app/model/Owner";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import db_connect from "@/app/lib/db_connect";

// // GET all users
// export async function GET(req) {
//   await  db_connect()
//   const users = await Owner.find();
//   return NextResponse.json(users);
// }

// // POST - create/register new user
// export async function POST(req) {
//   await db_connect()
//   const body = await req.json();
//   const { name, email, username, password,PropertyGST,propertyName,roomQuantity,startingPrice } = body;

//   if (!name || !email || !password || !startingPrice || !PropertyGST || !propertyName || !roomQuantity )
//     return NextResponse.json({ message: "All fields required" }, { status: 400 });

//   const existingUser = await Owner.findOne({ email });
//   if (existingUser) return NextResponse.json({ message: "User already exists" }, { status: 400 });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await Owner.create({ name, email, username, password: hashedPassword });

//   return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
// }



import Owner from "@/app/model/Owner";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db_connect from "@/app/lib/db_connect";

export async function GET(req) {
  await db_connect();
  const owners = await Owner.find();
  return NextResponse.json(owners);
}

export async function POST(req) {
  await db_connect();
  const body = await req.json();
  const {
    name,
    email,
    username,
    password,
    PropertyGST,
    propertyName,
    roomQuantity,
    startingPrice,
    phone,
    address,
    city,
    state,
    pin,
    pic,
    active
  } = body;

  // Check required fields
  if (!name || !email || !password ) {
    return NextResponse.json({ message: "All required fields must be provided" }, { status: 400 });
  }

  // Check if email already exists
  const existingOwner = await Owner.findOne({ email });
  if (existingOwner) return NextResponse.json({ message: "Owner already exists" }, { status: 400 });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create owner
  const owner = await Owner.create({
    name,
    email,
    username,
    password: hashedPassword,
    PropertyGST,
    propertyName,
    roomQuantity,
    startingPrice,
    phone: phone || "",
    address: address || "",
    city: city || "",
    state: state || "",
    pin: pin || "",
    pic: pic || "",
    active: active !== undefined ? active : true
  });

  return NextResponse.json({ message: "Owner created successfully", owner }, { status: 201 });
}
