import { NextResponse } from 'next/server';
import db_connect from '@/app/lib/db_connect';
import { createContact, getContacts } from '@/app/controller/contactController';

export async function POST(req) {
  try {
    await db_connect();
    const body = await req.json();

    // Optional: Validate data here
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contact = await createContact(body);
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await db_connect();
    const contacts = await getContacts();
    return NextResponse.json(contacts );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
