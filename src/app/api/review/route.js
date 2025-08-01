// import fs from "fs";
// import path from "path";
// import db_connect from "@/app/lib/db_connect";
// import Reviews from "@/app/model/reviews";

// export const config = {
//   api: {
//     bodyParser: { sizeLimit: "10mb" },
//   },
// };

// export default async function handler(req, res){
//     await db_connect();
//     if(req.method ==="POST"){
//         try {
//             const {name, profileImage,message,group, reviewImages,rating}=req.body ;
//             let profileImagePath ="";
//             if(profileImage){
//                 const nameImg = `profile_${Date.now()}.png`;
//                 const imgPath =`/uploads/reviews/${nameImg}`;
//                 const absPath = path.join(process.cwd(),"public",imgPath);
//                 const imageData = profileImage.replace(`/^data:image\/\w+;base64,/, "" `);
//                 fs.writeFileSync(absPath, Buffer.from(imageData,"base64"));
//                 profileImagePath = imgPath 
//             }
           
//             // Save review images
//             let reviewImagesPaths =[]
//              if(reviewImages && Array.isArray(reviewImages)){
//                 reviewImagesPaths =reviewImages.map((img, idx)=>{
//                     const nameImg = `profile_${Date.now()}_${idx}.png`
//                     const imgPath = `uploads/reviews/${nameImg}`;
//                     const absPath = path.join(process.cwd(), "public", imgPath);
//                     const imagePaths = img.replace(` /^data:image\/\w+;base64,/, "" `);
//                     fs.writeFileSync(absPath, Buffer.from(imagePaths, "base64"))
//                      return imgPath;
//                 })
//              }
            
//             const  item=  await Reviews.create({
//                 name,
//                 message,
//                 group,
//                 rating,

//                 profileImage: profileImagePath,
//                 reviewImages: reviewImagesPaths,
//             })
//             res.status(201).json({ success: true, data: item });

//         } catch (error) {
//             res.status(400).json({error :error.message
//             })
            
//         }
//     }

//     else if ( req.method === "GET"){
//         try {
//             const review = await Reviews.find().sort({ createdAt: -1 });
//             res.status(201).json(review)
//         } catch (error) {
//             res.status(400).json({error : error.message})
//         }
//     }

//     else{
//         res.status(400).json({message :"Method Not Allow"})
//     }
// }




// app/api/review/route.js
// import db_connect from "@/app/lib/db_connect";
// import { createReview, getAllReviews } from "@/app/controller/reviewsController";

// export const dynamic = "force-dynamic"; // optional: ensures server-side handling

// export async function GET(request) {
//   await db_connect();
//   return getAllReviews(request);
// }

// export async function POST(request) {
//   await db_connect();
//   return createReview(request);
// }

// src/app/api/review/route.js

import db_connect from "@/app/lib/db_connect";
import { createReview, getAllReviews } from "@/app/controller/reviewsController";

export const dynamic = "force-dynamic";

export async function GET() {
  await db_connect();
  return getAllReviews();
}

export async function POST(req) {
  await db_connect();
  const formData = await req.formData();
  return createReview(formData);
}


