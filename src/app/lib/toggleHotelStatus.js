import Hotel from "../model/Hotel";

export async function toggleHotelStatus(hotelId, status) {
  return await Hotel.findByIdAndUpdate(hotelId, { isActive: status }, { new: true });
}
