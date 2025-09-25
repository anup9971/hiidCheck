import db_connect from "@/app/lib/db_connect";
import Owner from "@/app/model/Owner";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises"
// GET single user by ID
export async function GET(req, { params }) {
  await db_connect()
  const user = await Owner.findById(params.id);
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}

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

// export async function PUT(req, { params }) {
//   try {
//       const userId = params.id; 
//     // const userId = params?.id;

//     await db_connect();
//     console.log("✅ MongoDB Connected");

//     const formData = await req.formData();

//     // Find user
//     const user = await Owner.findById(userId);
//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

//     // Delete old pic(s) automatically
//     const file = formData.get("pic");
//     if (user.pic) {
//       if (Array.isArray(user.pic)) {
//         for (const picPath of user.pic) await deleteImage(picPath);
//       } else if (typeof user.pic === "string") {
//         await deleteImage(user.pic);
//       }
//       user.pic = "";
//     }

//     // Upload new pic if exists
//     if (file && typeof file === "object") {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const uploadDir = path.join(process.cwd(), "public/uploads/owner");
//       await fs.mkdir(uploadDir, { recursive: true });

//       const filename = `${Date.now()}-${file.name}`;
//       const filepath = path.join(uploadDir, filename);
//       await fs.writeFile(filepath, buffer);

//       user.pic = `/uploads/owner/${filename}`;
//       console.log("✅ New pic uploaded:", user.pic);
//     }

//     // ✅ Update all other form fields dynamically
//     for (const [key, value] of formData.entries()) {
//       if (key !== "pic") {          // skip file field
//         user[key] = value;          // dynamically assign all fields
//       }
//     }

//     await user.save();

//     return NextResponse.json({
//       success: true,
//       message: "User updated successfully",
//       data: user,
//     });
//   } catch (error) {
//     console.error("❌ Error updating user:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }




// ------------------- update owner api use two ways ---------------------------------



export async function PUT(req, { params }) {
  try {
    const userId = params.id;
    await db_connect();
    console.log("✅ MongoDB Connected");

    const formData = await req.formData();

    // Find user
    const user = await Owner.findById(userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // ✅ Handle active field (even if no pic is uploaded)
    if (formData.has("active")) {
      const activeValue = formData.get("active");
      user.active =
        activeValue === "true" || activeValue === true ? true : false;
    }

    // ✅ Handle old pic deletion
    const file = formData.get("pic");
    if (file) {
      if (user.pic) {
        if (Array.isArray(user.pic)) {
          for (const picPath of user.pic) await deleteImage(picPath);
        } else if (typeof user.pic === "string") {
          await deleteImage(user.pic);
        }
        user.pic = "";
      }

      // ✅ Upload new pic
      if (typeof file === "object") {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public/uploads/owner");
        await fs.mkdir(uploadDir, { recursive: true });

        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(uploadDir, filename);
        await fs.writeFile(filepath, buffer);

        user.pic = `/uploads/owner/${filename}`;
        console.log("✅ New pic uploaded:", user.pic);
      }
    }

    // ✅ Update all other form fields dynamically (skip file & active)
    for (const [key, value] of formData.entries()) {
      if (key !== "pic" && key !== "active") {
        user[key] = value;
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}





// DELETE - delete user by ID
export async function DELETE(req, { params }) {
  await db_connect();
  const userId = params.id;

  try {
    const user = await Owner.findById(userId);
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

    await Owner.findByIdAndDelete(userId);

    return NextResponse.json({ success: true, msg: "User & pic deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, msg: "Error deleting user" }, { status: 500 });
  }
}