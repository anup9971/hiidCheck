 import db_connect from "@/app/lib/db_connect";
import { forgetPasswordRoleHandler } from "@/app/lib/forgetPasswordRoleHandler";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db_connect();
    const { username, role, otp } = await req.json();

    const Model = forgetPasswordRoleHandler(role);
    const data = await Model.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!data) {
      return NextResponse.json(
        { result: "Fail", reason: `${role} Not Found` },
        { status: 404 }
      );
    }

    if (String(data.otp) === String(otp)) {
      return NextResponse.json({ result: "Done" });
    } else {
      return NextResponse.json({ result: "Fail", reason: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { result: "Fail", reason: "Internal Server Error" },
      { status: 500 }
    );
  }
}
