// import db_connect from "@/app/lib/db_connect";
// import User from "@/app/model/User";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// // GET single user by ID
// export async function GET(req, { params }) {
//   await db_connect()
//   const user = await User.findById(params.id);
//   if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
//   return NextResponse.json(user);
// }


// export async function PUT(req, { params }) {
//   await db_connect();
//   const body = await req.json();
//   const user = await User.findById(params.id);

//   if (!user) 
//     return NextResponse.json({ message: "User not found" }, { status: 404 });

//   // normal fields update
//   const fields = ["name","username","email","phone","address","city","state","pin","active"];
//   fields.forEach(f => { 
//     if (body[f] !== undefined) user[f] = body[f]; 
//   });

//   // ✅ password update
//   if (body.password) {
//     const hashedPassword = await bcrypt.hash(body.password, 10);
//     user.password = hashedPassword;
//   }

//   await user.save();

//   return NextResponse.json({ message: "User updated successfully", user });
// }


// // DELETE - delete user by ID
// export async function DELETE(req, { params }) {
//   await db_connect()
//   const user = await User.findById(params.id);
//   if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

//   await User.findByIdAndDelete(params.id);
//   return NextResponse.json({ message: "User deleted successfully" });
// }














// export async function PUT(req, { params }) {
//   await db_connect();
//   const userId = params.id;

//   try {
//     const formData = await req.formData();
//     const name = formData.get("name");
//     const pic = formData.get("pic"); // file input
//     const deletePic = formData.get("deletePic"); // optional delete flag

//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 });
//     }

//     // ✅ Delete old pic if requested
//     if (deletePic === "true" && user.picPath) {
//       const oldPath = path.join(process.cwd(), "public", user.picPath);
//       try {
//         await fs.unlink(oldPath);
//       } catch (err) {
//         console.log("Old pic not found:", err.message);
//       }
//       user.picPath = null;
//     }

//     // ✅ Upload new pic if provided
//     if (pic && pic.name) {
//       const buffer = Buffer.from(await pic.arrayBuffer());
//       const fileName = `${Date.now()}-${pic.name}`;
//       const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

//       await fs.writeFile(uploadPath, buffer);
//       user.picPath = `/uploads/${fileName}`;
//     }

//     if (name) user.name = name;

//     await user.save();

//     return NextResponse.json({ success: true, data: user });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, msg: "Error updating user" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import db_connect from "@/app/lib/db_connect";
import User from "@/app/model/User";
import path from "path";
import fs from "fs/promises";








async function deleteImage(picPath) {
  const fullPath = path.join(process.cwd(), "public", picPath.replace(/^\/+/, ""));
  try {
    await fs.access(fullPath);
    await fs.unlink(fullPath);
    console.log("✅ Deleted:", fullPath);
  } catch (err) {
    console.log("⚠️ Could not delete:", fullPath, "-", err.message);
  }
}

export async function PUT(req, context) {
  try {
    const userId = context.params.id;
    console.log("🟢 User ID:", userId);

    await db_connect();
    console.log("✅ MongoDB Connected");

    const formData = await req.formData();

    // Find user
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Delete old pic(s) automatically
    const file = formData.get("pic");
    if (user.pic) {
      if (Array.isArray(user.pic)) {
        for (const picPath of user.pic) await deleteImage(picPath);
      } else if (typeof user.pic === "string") {
        await deleteImage(user.pic);
      }
      user.pic = "";
    }

    // Upload new pic if exists
    if (file && typeof file === "object") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public/uploads/user");
      await fs.mkdir(uploadDir, { recursive: true });

      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);

      user.pic = `/uploads/user/${filename}`;
      console.log("✅ New pic uploaded:", user.pic);
    }

    // ✅ Update all other form fields dynamically
    for (const [key, value] of formData.entries()) {
      if (key !== "pic") {          // skip file field
        user[key] = value;          // dynamically assign all fields
      }
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  await db_connect();
  const userId = params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 });
    }

    // ✅ Use helper here
    if (user.pic) {
      if (Array.isArray(user.pic)) {
        for (const picPath of user.pic) {
          await deleteImage(picPath);
        }
      } else if (typeof user.pic === "string") {
        await deleteImage(user.pic);
      }
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({ success: true, msg: "User & pic deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, msg: "Error deleting user" }, { status: 500 });
  }
}

// export async function DELETE(req, { params }) {
//   await db_connect();
//   const userId = params.id;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 });
//     }

//     // ✅ Delete pic if exists
//     if (user.picPath) {
//       const filePath = path.join(process.cwd(), "public", user.picPath);
//       try {
//         await fs.unlink(filePath);
//       } catch (err) {
//         console.log("Pic already deleted:", err.message);
//       }
//     }

//     await User.findByIdAndDelete(userId);

//     return NextResponse.json({ success: true, msg: "User & pic deleted" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, msg: "Error deleting user" }, { status: 500 });
//   }
// }

export async function GET(req, { params }) {
  await db_connect();
  const userId = params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, msg: "Error fetching user" },
      { status: 500 }
    );
  }
}
