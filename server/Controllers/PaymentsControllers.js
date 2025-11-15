const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Set in .env

const createCheckoutSession = async (req, res) => {
  const { listingId, customerId, totalPrice, startDate, endDate, hostId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: `Booking for listing ${listingId}` },
            unit_amount: totalPrice * 100, // in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/success?listingId=${listingId}&customerId=${customerId}&totalPrice=${totalPrice}&startDate=${startDate}&endDate=${endDate}&hostId=${hostId}`,
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCheckoutSession };
