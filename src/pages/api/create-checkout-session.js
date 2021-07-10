import { connectToDatabase } from "../../util/mongodb";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  try {
    const { db } = await connectToDatabase();
    //await db.collection("temp").deleteMany({ user: email });
    //to delete temp doc in 56 days automatically. run only one time
    //await db.collection("temp").createIndex({ "createdAt": 1 }, { expireAfterSeconds:4838400 })
    const result = await db.collection("temp").insertOne({
      user: email,
      items,
      createdAt: new Date(),
    });
    const transformedItems = items.map((item) => ({
      description: item.description,
      quantity: item.qty,
      price_data: {
        currency: "INR",
        //unit_amount_decimal  insted to unit_amount for decimal
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
         // images: [item.image],
        },
      },
    }));
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1J1z9cSILNiInkjsOUxwYnGT"],
        shipping_address_collection: {
          allowed_countries: ["GB", "US", "CA", "IN"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/cart`,
        metadata: {
          id: JSON.stringify(result.insertedId),
        },
      });
      return res.status(200).json({ id: session.id });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Bad Request" });
  }
};
