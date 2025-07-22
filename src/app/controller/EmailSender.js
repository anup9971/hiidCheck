import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendCoomingsoomEmail = async (data) => {
  try {
    console.log("Sending email to", data.email);

    // Mail to customer
    await transporter.sendMail({
      from: `"Hotel In Delhi" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Thank You for Contacting Hotel in Delhi",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Thank You for Contacting Hotel in Delhi</h2>
          <p>Dear <strong>${data.name}</strong>,</p>
          <p>We’ve received your message. Our team will contact you shortly.</p>
          <p>For urgent queries, call: +91-9971522879</p>
          <hr/>
          <p>Warm regards,<br/>Hotel Delhi Airport Plaza Team</p>
        </div>
      `,
    });

    // Mail to admin
    await transporter.sendMail({
      from: `"Hotel In Delhi" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Query Received – Hotel in Delhi",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>📩 New Contact Query</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        </div>
      `,
    });

    console.log("✅ Emails sent");
  } catch (error) {
    console.error("❌ Email Error:", error);
  }
};
