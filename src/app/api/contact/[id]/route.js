import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import {
  deleteContact,
  updateContact,
} from "@/controllers/contactController";



export async function DELETE(req, { params }) {
  await dbConnect();

  const { id } = params; // ✅ ये dynamic route से id उठाता है

  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  const deleted = await deleteContact(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Contact deleted', contact: deleted }, { status: 200 });
}
export async function PUT(req) {
  await dbConnect();
  const body = await req.json();
  const id = body.id;
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const updated = await updateContact(id, body);
  return NextResponse.json(updated, { status: 200 });
}
