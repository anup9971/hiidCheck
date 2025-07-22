import Commingsoon from "@/app/model/Commingsoon";
import { sendCoomingsoomEmail } from "./EmailSender";

export const createRecord = async (data) => {
  try {
    const data = await Commingsoon.create(data);
    // sendCoomingsoomEmail(data).
    sendCoomingsoomEmail(data).catch((err) => {
    console.error("❌ Error sending email:", err);
  });

    // Send email (await with try/catch for error logging)
    // try {
    //   await sendCoomingsoomEmail(contact);
    // } catch (emailErr) {
    //   console.error("❌ Email sending failed:", emailErr);
    // }

    return data;
  } catch (err) {
    console.error("❌ DB Record creation failed:", err);
    throw err;
  }
};
