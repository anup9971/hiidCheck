 import nodemailer from 'nodemailer';

// Setup transporter

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user:"datapgca1@gmail.com",
    pass:"lgbrxwrrdjuelpum",
  },
});

export const sendCoomingsoomEmail = async (contact) => {
  try {
    // Mail to customer
   
    await transporter.sendMail({
      from:"datapgca1@gmail.com",
      to:contact.email,
      subject: "Thank You for Contacting Hotel in Delhi",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2>Thank You for Contacting Hotel in Delhi</h2>
          <p>Dear <strong>${contact.name}</strong>,</p>
          <p>We have received your message. Our team will get back to you soon.</p>
          <p>For urgent queries, call us at +91-9971522879</p>
          <hr/>
          <p>Warm regards,<br/>Team Hotel Delhi AirPort Plaza</p>
        </div>
      `,
    });

    // Mail to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Query Received – Hotel in Delhi",
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