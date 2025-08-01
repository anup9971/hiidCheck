// import db_connect from "@/app/lib/db_connect";
// import Reviews from "@/app/model/reviews"
// import { deleteFile } from "@/app/untils/deleteFile";
// import fs from "fs";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "10mb", // adjust as needed
//     },
//   },
// };


// export default async function handler (req, res){
//      await db_connect();
//     const {id }= req.query
//     // find single item 
//     if(req.method === "GET"){
//         try {
//             let item = await Reviews.findById(id)
//             if(!item){
//                return  res.status(404).json({message :"Data not found"})
//             }
//             else{
//                 res.status(200).json(item)
//             }
//         } catch (error) {
//             res.status(400).json({error:error.message})
//         }
//     }

//     // update data
//     else if (req.method === "PUT"){
//         try {
//             const {name, profileImage,message, group,reviewImages,rating}=req.body
//             let item = await Reviews.findById(id)
//         if(!item)   return  res.status(404).json({message :"Data not update , data not found "})
    
//         //  Update profile image
//         if(profileImage && profileImage.startsWith("data:image")){
//             if(item.profileImage) deleteFile(item.profileImage);
//             const nameImg =`profile_${Date.now()}.png`;
//             const imgPath =`/uploads/reviews/${nameImg}`;
//             const absPath = path.join(process.cwd(), "public", imgPath)
//            const imageData = profileImage.replace(`/^data:image\/\w+;base64,/, "" `);
//            fs.writeFileSync(absPath, Buffer.from(imageData,"base64"))
//            item.profileImage=imgPath
//         }
//          // Update review images

//         if(reviewImages && Array.isArray(reviewImages)){
//             item.reviewImages.forEach(img => {deleteFile(img)});
//             const imagePaths = reviewImages.map((item, idx)=>{
//                 const nameImg = `review ${Date.now()}_${idx}.png`
//                 const imgPath = `/uploads/reviews/${nameImg}`;
//                 const absPath = path.join(process.cwd(), "public",imgPath);
//               const imageData =img.replace(` /^data:image\/\w+;base64,/, "" `)
//               fs.writeFileSync(absPath, Buffer.from(imageData, "base64"))  
//                 return imgPath;
//             })
//            item.reviewImages = imagePaths;
//         }
//            item.name =name;
//            item.message= message;
//            item.group = group;
//            item.rating = rating;
//           await item.save()
//           res.status(201).json({message: "Done",data:item})

//         } catch (error) {
//             res.status(500).json({error :error.message})
//         }
//     }

//     // delete single item
//     else if( req.method ==="DELETE"){
//        try {
//          let item = await Reviews.findById(id)
//         if(!item) return res.status(404).json({message:"Data Not Delete , Data not Found"})
         
//         if(item.profileImage) deleteFile(item.profileImage);
//            item.reviewImages.forEach((img)=>deleteFile(img))
//            await Reviews.findByIdAndDelete(id)
//         res.status(200).json({ success: true, message: "Deleted successfully" });
//        } catch (error) {
//         res.status(400).json({error :error.message})
//        }
//     }

//     else  res.status(405).json({ message: 'Method not allowed' })
// }








// import db_connect from "@/app/lib/db_connect";
// import {
//   getReviewById,
//   updateReview,
//   deleteReview,
// } from "@/app/controller/reviewsController";

// export const config = {
//   api: {
//     bodyParser: { sizeLimit: "10mb" },
//   },
// };

// export default async function handler(req, res) {
//   await db_connect();

//   if (req.method === "GET") return getReviewById(req, res);
//   if (req.method === "PUT") return updateReview(req, res);
//   if (req.method === "DELETE") return deleteReview(req, res);

//   res.status(405).json({ message: "Method Not Allowed" });
// }


// src/app/api/review/[id]/route.js

import db_connect from "@/app/lib/db_connect";
import {
  getReviewById,
  updateReview,
  deleteReview,
} from "@/app/controller/reviewsController";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  await db_connect();
  return getReviewById(params.id);
}

export async function PUT(req, { params }) {
  await db_connect();
  const formData = await req.formData();
  return updateReview(formData, params.id);
}

export async function DELETE(req, { params }) {
  await db_connect();
  return deleteReview(params.id);
}



