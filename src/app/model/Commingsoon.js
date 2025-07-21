
const mongoose = require("mongoose")

const CommingsoonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name Field Is Required"]
    },
    email:{
        type:String,
        required:[true, "Email Field Is Required"]
        
    },
    message:{
        type:String,

    },
    phone:{
        type:Number,
        required:[true, "Phone Field Is Required"]
    }

})

export default mongoose.models.Commingsoon || mongoose.model("Commingsoon", CommingsoonSchema)