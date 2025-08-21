import fs from "fs"
import path  from "path"


export const deleteFile = (relativePath) => {
  try {
    const fullPath = path.join(process.cwd(), "public", relativePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      // console.log("🗑️ Deleted:", fullPath);
    } else {
      console.log("⚠️ File not found for deletion:", fullPath);
    }
  } catch (err) {
    console.error("❌ Error deleting file:", err);
  }
};      