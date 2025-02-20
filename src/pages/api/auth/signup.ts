import { hash } from "bcryptjs";
import {prisma} from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Create new user
  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return res.status(201).json({ message: "User registered successfully", user: newUser });
}
