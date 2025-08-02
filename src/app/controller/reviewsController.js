import { NextResponse } from "next/server";
import Reviews from "@/app//model/reviews";
import fs from "fs";
import path from "path";
import { deleteFile } from "@/app/untils/deleteFile";
import { log } from "console";

// helper
const saveFile = async (file, prefix) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = `${prefix}_${Date.now()}_${file.name}`;
  const relPath = `/uploads/reviews/${name}`;
  const absPath = path.join(process.cwd(), "public", relPath);
  fs.writeFileSync(absPath, buffer);
  return relPath;
};

// GET ALL
export const getAllReviews = async () => {
  try {
    const data = await Reviews.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
};

// GET ONE
export const getReviewById = async (id) => {
  try {
    const item = await Reviews.findById(id);
    if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: item }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
};

// CREATE
export const createReview = async (formData) => {
  try {
    const name = formData.get("name");
    const message = formData.get("message");
    const group = formData.get("group");
    const rating = Number(formData.get("rating"));

    let profileImage = "";
    const pFile = formData.get("profileImage");
    if (pFile?.name) {
      profileImage = await saveFile(pFile, "profile");
    }

    const reviewImages = [];
    const files = formData.getAll("reviewImages");
    for (const file of files) {
      if (file.name) reviewImages.push(await saveFile(file, "review"));
    }

    const review = await Reviews.create({ name, message, group, rating, profileImage, reviewImages });
    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
};

// UPDATE
// export const updateReview = async (formData, id) => {
//   console.log(id);
  
//   try {
//     const review = await Reviews.findById(id);
//     if (!review) return NextResponse.json({ message: "Not found" }, { status: 404 });

//     review.name = formData.get("name");
//     review.message = formData.get("message");
//     review.group = formData.get("group");
//     review.rating = Number(formData.get("rating"));

//     const pFile = formData.get("profileImage");
//     if (pFile?.name) {
//       if (review.profileImage) deleteFile(review.profileImage);
//       review.profileImage = await saveFile(pFile, "profile");
//     }

//     const files = formData.getAll("reviewImages");
//     if (files.length) {
//       review.reviewImages.forEach(img => deleteFile(img));
//       review.reviewImages = [];
//       for (const file of files) {
//         if (file.name) review.reviewImages.push(await saveFile(file, "review"));
//       }
//     }

//     await review.save();
//     return NextResponse.json({ success: true, data: review }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// };

export const updateReview = async (formData, id) => {
  console.log("Updating review ID:", id);

  try {
    const review = await Reviews.findById(id);
    if (!review) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const name = formData.get("name");
    const message = formData.get("message");
    const group = formData.get("group");
    const rating = Number(formData.get("rating"));
    const pFile = formData.get("profileImage");
    const files = formData.getAll("reviewImages");

    console.log("Incoming fields:", { name, message, group, rating });
    console.log("Profile image file:", pFile);
    console.log("Review image files:", files);

    review.name = name;
    review.message = message;
    review.group = group;
    review.rating = rating;

    if (pFile && pFile.name) {
      console.log("Deleting old profile image:", review.profileImage);
      if (review.profileImage && typeof deleteFile === "function") {
        deleteFile(review.profileImage);
      }
      if (typeof saveFile === "function") {
        review.profileImage = await saveFile(pFile, "profile");
      } else {
        throw new Error("saveFile function is not defined");
      }
    }

    if (Array.isArray(files) && files.length > 0) {
      console.log("Deleting old review images:", review.reviewImages);
      review.reviewImages.forEach(img => {
        if (typeof deleteFile === "function") {
          deleteFile(img);
        }
      });

      review.reviewImages = [];

      for (const file of files) {
        if (file.name && typeof saveFile === "function") {
          const saved = await saveFile(file, "review");
          review.reviewImages.push(saved);
        }
      }
    }

    await review.save();
    console.log("✅ Review updated:", review);

    return NextResponse.json({ success: true, data: review }, { status: 200 });
  } catch (err) {
    console.error("❌ updateReview error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
};



// DELETE
export const deleteReview = async (id) => {
  try {
    const review = await Reviews.findById(id);
    if (!review) return NextResponse.json({ message: "Not found" }, { status: 404 });

    if (review.profileImage) deleteFile(review.profileImage);
    review.reviewImages.forEach(img => deleteFile(img));
    await Reviews.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
};
