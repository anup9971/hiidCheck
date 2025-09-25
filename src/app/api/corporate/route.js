


import nodemailer from "nodemailer";
import db_connect from "@/app/lib/db_connect";
import Room from "@/app/model/Room";
import Owner from "@/app/model/Owner";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { roomId, customerName, customerEmail } = req.body;
  await db_connect();

  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ message: "Room not found" });

  const owner = await Owner.findById(room.owner_id);
  if (!owner) return res.status(404).json({ message: "Owner not found" });

  const bookingDetails = `Room: ${room.name}\nPrice: ${room.price}\nCustomer: ${customerName}`;
  const adminEmail = "admin@example.com";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  try {
    // Owner
    await transporter.sendMail({ from: process.env.EMAIL_USER, to: owner.email, subject: `New Booking: ${room.name}`, text: bookingDetails });

    // Admin
    await transporter.sendMail({ from: process.env.EMAIL_USER, to: adminEmail, subject: `Booking Notification: ${room.name}`, text: `Customer ${customerName} booked ${room.name}.\n${bookingDetails}` });

    // Customer
    await transporter.sendMail({ from: process.env.EMAIL_USER, to: customerEmail, subject: `Booking Confirmed: ${room.name}`, text: `Hello ${customerName}, your booking for ${room.name} is confirmed.\n${bookingDetails}` });

    res.status(200).json({ message: "Booking successful, emails sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending emails" });
  }
}
