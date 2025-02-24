
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        const {symbol,name,price,quantity,type} = req.body;
        try{
            const transaction = await prisma.transaction.create({
                data:{symbol,name,price,quantity,type},
            });
            return res.status(200).json(transaction);
        }catch(error){
            return res.status(500).json({error: "Error creating transaction"});
        }
    }
    if(req.method === "GET"){
        try{
            const transactions = await prisma.transaction.findMany({orderBy:{createdAt:"desc"}});
            return res.status(200).json(transactions);
        }catch(error){
            return res.status(500).json({error: "Error fetching transactions"});
        }
    }
    res.status(405).json({error: "Method not allowed"});
}