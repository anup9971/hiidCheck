import db_connect from "@/app/lib/db_connect";
import { forgetPasswordRoleHandler } from "@/app/lib/forgetPasswordRoleHandler";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    await db_connect();
    const { username, role } = await req.json();

    const Model = forgetPasswordRoleHandler(role);
    let data = await Model.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!data) {
      return NextResponse.json(
        { result: "Fail", reason: `${role} Not Found` },
        { status: 404 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    data.otp = otp;
    await data.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: `Password Reset OTP - ${role}`,
      text: `Hello ${data.name},\nYour OTP for password reset is ${otp}.\nNever share this OTP with anyone.`,
    });

    return NextResponse.json({
      result: "Done",
      message: `OTP sent to your ${role} email`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { result: "Fail", reason: "Internal Server Error" },
      { status: 500 }
    );
  }
}
