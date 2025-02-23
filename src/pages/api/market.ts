import { NextApiRequest, NextApiResponse } from 'next';
import { getFakeMarketData } from "@/utils/fakeMarket";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(getFakeMarketData());
}
