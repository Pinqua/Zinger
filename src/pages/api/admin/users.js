import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    try {
        const session = await getSession({ req });
        if (session && session.admin) {
            const { db } = await connectToDatabase();
            let users = await db.collection("users").find({}).toArray();
            users = JSON.parse(JSON.stringify(users));
            return res.status(200).json(users);
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
