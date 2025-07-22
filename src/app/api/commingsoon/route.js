import { createRecord } from "@/app/controller/commingsoonController";
import { NextResponse } from "next/server";
import Commingsoon from "@/app/model/Commingsoon";
import db_connect from "@/app/lib/db_connect";


export async function POST(req) {
  try {
    await db_connect();
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const saved = await Commingsoon.create({ name, email, phone, message });

    return Response.json({ success: true, data: saved });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}