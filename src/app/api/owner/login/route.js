// import db_connect from "@/app/lib/db_connect";
// import User from "@/app/model/User";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   await db_connect();
//   const { username, password } = await req.json();

//   if (!username || !password) 
//     return NextResponse.json({ message: "Email and password required" }, { status: 400 });

//   const user = await User.findOne({ email });
//   if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

//   // Generate JWT token
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//   return NextResponse.json({ message: "Login successful", token, user });
// }








// import db_connect from "@/app/lib/db_connect";
// import Owner from "@/app/model/Owner";

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     await db_connect();
//     const body = await req.json();
//     const { username, password } = body;

//     // Check if username and password provided
//     if (!username || !password) {
//       return NextResponse.json(
//         { result: "Fail", reason: "Username and password required" },
//         { status: 400 }
//       );
//     }

//     // Find user by username or email
//     const user = await Owner.findOne({
//       $or: [{ username }, { email: username }],
//     });

//     if (!user) {
//       return NextResponse.json({ result: "Fail", reason: "User not found" }, { status: 404 });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ result: "Fail", reason: "Invalid credentials" }, { status: 401 });
//     }

//     // JWT secret based on role
//     const secretKey =
//       user.role === "Owner"
//         ? process.env.JWT_SECRET_KEY_BUYER
//         : process.env.JWT_SECRET_KEY_ADMIN;

//     // Generate token
//     const token = jwt.sign({ data: user }, secretKey, { expiresIn: "7d" });

//     return NextResponse.json({ result: "Done", data: user, token });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { result: "Fail", reason: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


import db_connect from "@/app/lib/db_connect";
import Owner from "@/app/model/Owner"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db_connect();
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { result: "Fail", reason: "Username and password required" },
        { status: 400 }
      );
    }

    // Find by username or email
    const user = await Owner.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return NextResponse.json(
        { result: "Fail", reason: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { result: "Fail", reason: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Role based secret key
    const secretKey =
  user.role.toLowerCase() === "owner"
    ? process.env.JWT_SECRET_KEY_BUYER   // tumhare env me Owner key is JWT_SECRET_KEY_BUYER
    : process.env.JWT_SECRET_KEY_ADMIN;

    console.log("User Role:", user.role);
console.log("Secret Key:", secretKey);

    // Generate JWT
    const token = jwt.sign({ data: user }, secretKey, { expiresIn: "7d" });

    return NextResponse.json({ result: "Done", data: user, token });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { result: "Fail", reason: "Internal server error" },
      { status: 500 }
    );
  }
}

