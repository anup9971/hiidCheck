// import nodemailer from 'nodemailer';



// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user:process.env.EMAIL_USER,
//     pass:process.env.EMAIL_PASS,
//   },
// });




// export const sendContactCreatedMail = async (contact) => {
//   try {

   
//     await transporter.sendMail({
//       from:process.env.EMAIL_USER,
//       to:contact.email,
//       subject: "Thank You for Contacting Hotel In Delhi ",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
//           <h2>Thank You for Contacting Hotel In Delhi </h2>
//           <p>Dear <strong>${contact.name}</strong>,</p>
//           <p>We have received your message. Our team will get back to you soon.</p>
//           <p>For urgent queries, call us at 011 6909 2435</p>
//           <hr/>
//           <p>Warm regards,<br/>Team Hotel In Delhi </p>
//         </div>
//       `,
//     });


//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: "New Contact Query Received – Hotel In Delhi ",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
//           <h2>📩 New Contact Query</h2>
//           <p><strong>Name:</strong> ${contact.name}</p>
//           <p><strong>Email:</strong> ${contact.email}</p>
//           <p><strong>Phone:</strong> ${contact.phone}</p>
//           <p><strong>Message:</strong> ${contact.message}</p>
//         </div>
//       `,
//     });

//   } catch (error) {
//     console.error("❌ Contact Mail Error:", error);
//   }
// };





// export const config = {
//   runtime: "nodejs",  
// };









// pages/api/contactMail.js or lib/mail.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Main send function
export const sendContactCreatedMail = async (contact) => {
  // console.log(contact.email);
  
  try {
    // 1. Mail to customer
    await resend.emails.send({
      from: 'Hotel In Delhi <contact@hotelindelhi.in>', // use verified sender later
      to:contact.email,
      subject: 'Thank You for Contacting Hotel In Delhi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2>Thank You for Contacting Hotel In Delhi </h2>
          <p>Dear <strong>${contact.name}</strong>,</p>
          <p>We have received your message. Our team will get back to you soon.</p>
          <p>For urgent queries, call us at 011 6909 2435</p>
          <hr/>
          <p>Warm regards,<br/>Team Hotel In Delhi </p>
        </div>
      `,
    });

    // 2. Mail to Admin
    await resend.emails.send({
      from: 'Hotel In Delhi <contact@hotelindelhi.in>',
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Query Received – Hotel In Delhi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2>📩 New Contact Query</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone}</p>
          <p><strong>Message:</strong> ${contact.message}</p>
        </div>
      `,
    });

  } catch (error) {
    console.error("❌ Resend Email Error:", error);
  }
};
