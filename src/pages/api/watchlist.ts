import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"; 
import { prisma } from "../../lib/prisma"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized" });
    const userEmail = session.user?.email;
    if (!userEmail) return res.status(400).json({ error: "User email not found in session" });

    const user = await prisma.user.findUnique({ where: { email: userEmail }, select: { id: true } });
    const userId = user?.id;
    if(!userId) return res.status(400).json({ error: "User not found in database" });

    if (req.method === "GET") {
        // Fetch user's watchlist
        const watchlist = await prisma.watchlist.findUnique({ where: { userId } });
        return res.status(200).json(watchlist ? watchlist.stocks : []);
    }

    if (req.method === "POST") {
        // Save watchlist to the database
        const { stocks } = req.body;
        const updatedWatchlist = await prisma.watchlist.upsert({
            where: { userId },
            update: { stocks },
            create: { userId, stocks },
        });
        return res.status(200).json(updatedWatchlist.stocks);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
