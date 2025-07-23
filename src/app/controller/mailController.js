import nodemailer from 'nodemailer';

// Setup transporter

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  },
});


// ==================== CONTACT MAIL ====================

export const sendContactCreatedMail = async (contact) => {
  try {
    // Mail to customer
   
    await transporter.sendMail({
      from:process.env.EMAIL_USER,
      to:contact.email,
      subject: "Thank You for Contacting Hotel In Delhi ",
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

    // Mail to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Query Received – Hotel In Delhi ",
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
    console.error("❌ Contact Mail Error:", error);
  }
};


// ==================== BOOKING MAIL ====================

// export const sendCreateBookingMail = async (booking) => {
//   try {
   
    
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: booking.email,
//       subject: "Booking Confirmation – Hotel In Delhi ",
//       html: `
//         <p>Dear <strong>${booking.name}</strong>,</p>
//         <p>Your room booking is confirmed. Below are the details:</p>
//         <ul>
//           <li><strong>Booking ID:</strong> ${booking.bookingID}</li>
//           <li><strong>Room Type:</strong> ${booking.roomtype}</li>
//           <li><strong>Check-In:</strong> ${booking.checkIn}</li>
//           <li><strong>Check-Out:</strong> ${booking.checkOut}</li>
//           <li><strong>Adult:</strong> ${booking.adult}</li>
//           <li><strong>Child:</strong> ${booking.child}</li>
//           <li><strong>No. of Rooms:</strong> ${booking.room}</li>
//           <li><strong>Room Price:</strong> ₹${booking.roomPrice}/night</li>
//           <li><strong>Stay of Total Night:</strong> ${booking.day}</li>
//           <li><strong>GST(12%):</strong> ₹${booking.gst}</li>
//           <li><strong>Total Price:</strong> ₹${booking.totalPrice}</li>
//         </ul>
//         <p>For support, contact us at queryhiid@gmail.com</p>
//         <p>Warm regards,<br/>Hotel In Delhi </p>
//       `,
//     });

//     // Mail to admin
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: "New Booking Received – Hotel In Delhi ",
//       html: `
//         <h2>🛏 New Booking Notification</h2>
//         <ul>
//           <li><strong>Name:</strong> ${booking.name}</li>
//           <li><strong>Email:</strong> ${booking.email}</li>
//           <li><strong>Phone:</strong> ${booking.phone}</li>
//           <li><strong>Booking ID:</strong> ${booking.bookingID}</li>
//           <li><strong>Room Type:</strong> ${booking.roomtype}</li>
//           <li><strong>Check-In:</strong> ${booking.checkIn}</li>
//           <li><strong>Check-Out:</strong> ${booking.checkOut}</li>
//           <li><strong>Room Price/Night:</strong> ₹${booking.roomPrice}</li>
//           <li><strong>No. of Rooms:</strong> ${booking.room}</li>
//           <li><strong>Stay of Total Night:</strong> ${booking.day}</li>
//           <li><strong>GST(12%):</strong> ₹${booking.gst}</li>
//           <li><strong>Total Price:</strong> ₹${booking.totalPrice}</li>
//         </ul>
//       `,
//     });

//   } catch (error) {
//     console.error("❌ Booking Mail Error:", error);
//   }
// };
export const config = {
  runtime: "nodejs",  // important!
};