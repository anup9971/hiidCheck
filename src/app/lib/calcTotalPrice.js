export function calcTotalPrice({ roomData, searchData, meals, nights}) {
  if (!nights) return 0;

  // Room price
  const roomPrice =
    (roomData?.data?.price || 0) * nights * (searchData?.room || 1);

  // Meal price
  let mealPrice = 0;
  if (meals?.breakfast) {
    mealPrice +=
      (roomData?.data?.breakfast || 200) *
      ((searchData?.adult || 1) + (searchData?.child || 0)) *
      nights;
  }
  if (meals?.dinner) {
    mealPrice +=
      (roomData?.data?.dinner || 200) *
      ((searchData?.adult || 1) + (searchData?.child || 0)) *
      nights;
  }

  // Subtotal (room + meals only)
  const subTotal = roomPrice + mealPrice;

  // GST
  const gst = Math.round(subTotal * 0.12);

  // Final total (whole number)
    const totalPrice = Math.round(subTotal + gst);
     return { totalPrice, gst, subTotal };
}
