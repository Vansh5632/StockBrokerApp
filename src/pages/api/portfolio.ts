import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"; // Adjust the path as per your folder structure
import {prisma} from "@/lib/prisma"; // Ensure Prisma client is configured correctly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.user?.id;

    if (!userId) {
        return res.status(400).json({ error: "User ID not found in session" });
    }

    if (req.method === "POST") {
        try {
            const { holdings, tradeHistory, funds } = req.body;

            const updatedPortfolio = await prisma.portfolio.upsert({
                where: { userId },
                update: { holdings, tradeHistory, funds },
                create: { userId, holdings, tradeHistory, funds },
            });

            return res.status(200).json(updatedPortfolio);
        } catch (error) {
            console.error("Portfolio update error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
