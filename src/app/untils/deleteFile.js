import fs from "fs"
import path  from "path"


export const deleteFile = (relativePath)=>{
    const fullpath = path.join(process.cwd(), "public",filePath)
    if(fs.existsSync(fullpath)){
        fs.unlinkSync(fullpath)
    }
}