import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Log session for debugging
  console.log("Session:", session);

  const userEmail = session.user?.email;

  if (!userEmail) {
    return res.status(400).json({ error: "User email not found in session" });
  }

  // Find user by email to get the ID
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  const userId = user?.id;

  if (!userId) {
    return res.status(400).json({ error: "User not found in database" });
  }

  if (req.method === "GET") {
    try {
      const portfolio = await prisma.portfolio.findUnique({
        where: { userId },
      });

      if (!portfolio) {
        return res.status(200).json({
          holdings: [],
          tradeHistory: [],
          funds: 10000, // Default value from your component
        });
      }

      return res.status(200).json(portfolio);
    } catch (error) {
      console.error("Portfolio fetch error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { holdings, tradeHistory, funds } = req.body;

      // Log Prisma model for debugging
      console.log("Prisma portfolio:", prisma.portfolio);

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