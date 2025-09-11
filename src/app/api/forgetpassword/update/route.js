
import { forgetPasswordRoleHandler } from "@/app/lib/forgetPasswordRoleHandler";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db_connect from "@/app/lib/db_connect";

export async function POST(req) {
  try {
    await db_connect();
    const { username, role, password } = await req.json();

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

    const hash = await bcrypt.hash(password, 12);
    data.password = hash;
    await data.save();

    return NextResponse.json({
      result: "Done",
      reason: `${role} Password Reset Successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { result: "Fail", reason: "Internal Server Error" },
      { status: 500 }
    );
  }
}
