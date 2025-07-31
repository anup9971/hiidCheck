import db_connect from "@/app/lib/db_connect";
import Reviews from "@/app/model/reviews"



export default async function handler (req, res){
     await db_connect();
    const {id }= req.query
    // find single item 
    if(req.method === "GET"){
        try {
            let item = await Reviews.findById(id)
            if(!item){
               return  res.status(404).json({message :"Data not found"})
            }
            else{
                res.status(200).json(item)
            }
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }

    // update data
    else if (req.method === "PUT"){
        try {
            let item = await Reviews.findByIdAndUpdate(id,req.body,{
                new:true,
                 runValidators: true,
            });
        
        if(!item){
            return  res.status(404).json({message :"Data not update , data not found "})
        }
        else  res.status(201).json(item)
        } catch (error) {
            res.status(500).json({error :error.message})
        }
    }

    // delete single item
    else if( req.method ==="DELETE"){
       try {
         let item = await Reviews.findByIdAndDelete(id)
        if(!item) return res.status(404).json({message:"Data Not Delete , Data not Found"})
        
        else{
            res.status(200).json(item)
        } 
       } catch (error) {
        res.status(400).json({error :error.message})
       }
    }

    else  res.status(405).json({ message: 'Method not allowed' })
}