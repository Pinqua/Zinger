import { ObjectId } from "bson";
import { buffer } from "micro";
import { connectToDatabase } from "../../util/mongodb";

//Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  try {
    const { db } = await connectToDatabase();
    let result = await db
      .collection("temp")
      .findOne({ _id: ObjectId(JSON.parse(session.metadata.id)) });
    delete result._id;
    const ord_status = { status: "shipping soon", timestamp: new Date() };
    await db.collection("orders").insertOne({
      order_status: {
        current: ord_status,
        info: [ord_status],
      },
      ...result,
      ...session,
      timestamp: new Date(),
    });
    console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
  } catch (err) {
    console.error(err);
  }
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    //Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ message: err.message });
    }

    //Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //Fulfill the order
      return fulfillOrder(session)
        .then(() => res.status(200).json({ message: "success" }))
        .catch((err) => {
          console.error(err);
          return res.status(400).json({ message: err.message });
        });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
