import dbConnect from "../../../lib/dbConnect";
import Room from "../../../models/Room";

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === "GET") {
    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    return res.status(200).json(room);
  }

  if (req.method === "PUT") {
    const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: "Room not found" });
    return res.status(200).json(room);
  }

  if (req.method === "DELETE") {
    const room = await Room.findByIdAndDelete(id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    return res.status(200).json({ message: "Room deleted successfully" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
