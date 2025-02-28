import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const userEmail = session.user?.email;

  if (!userEmail) return res.status(400).json({ error: "User email missing" });

  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!user) return res.status(404).json({ error: "User not found" });

  if (req.method === "GET") {
    // Fetch portfolio summary
    const portfolio = await prisma.portfolioSummary.findUnique({
      where: { userId: user.id },
    });
    return res.json(portfolio || { stocks: [] });
  }

  if (req.method === "POST") {
    const { stocks } = req.body;

    // Update or create portfolio summary
    const updatedPortfolio = await prisma.portfolioSummary.upsert({
      where: { userId: user.id },
      update: { stocks },
      create: { userId: user.id, stocks },
    });

    return res.json(updatedPortfolio);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
