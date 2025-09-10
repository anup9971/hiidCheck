import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount } = await req.json();

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: amount * 100, // paise me
      currency: "INR",
      receipt: "order_rcptid_" + Date.now(),
    });

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
