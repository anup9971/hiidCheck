import Commingsoon from "@/app/model/commingsoon"
import { sendCoomingsoomEmail } from "./EmailSender";

export const createRecord = async(data)=>{
     const contact =  await Commingsoon.create(data);
     sendCoomingsoomEmail((contact).catch((err)=>{
        console.log("Email Error ",err);
        
     }))
     return contact
}