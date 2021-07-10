import { ObjectId } from "bson";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            const session = await getSession({ req });
            if (session) {
                const { db } = await connectToDatabase();
                const admin = await db
                    .collection("admins")
                    .findOne({ user: session.user.email });
                if (!admin) {
                    return res.status(401).json({ message: "Unauthorized" });
                } else {
                    await db
                        .collection("dishes")
                        .deleteOne({ _id: ObjectId(req.body._id) });
                    return res
                        .status(200)
                        .json({ message: "Dish deleted successfully" });
                }
            } else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        } else {
            return res.status(400).json({ message: "Bad Request" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
