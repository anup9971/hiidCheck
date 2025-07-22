
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Name field is required"]
    },
    email:{
        type:String,
        required:[true, "Email Field is Required"]
    },
    phone:{
        type:String,
        required :[true, "Phone Field is Required"]
    },
    message:{
        type:String,
       
    }

})
export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
