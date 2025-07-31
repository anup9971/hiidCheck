import db_connect from "@/app/lib/db_connect";
import Reviews from "@/app/model/reviews"


export default async function handler(req, res){
    await db_connect();
    if(req.method ==="POST"){
        try {
            const review = await Reviews.create(req.body)
            res.status(201).json(review)
        } catch (error) {
            res.status(400).json({error :error.message
            })
            
        }
    }

    else if ( req.method === "GET"){
        try {
            const review = await Reviews.find({});
            res.status(201).json(review)
        } catch (error) {
            res.status(400).json({error : error.message})
        }
    }

    else{
        res.status(400).json({message :"Method Not Allow"})
    }
}