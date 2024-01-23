import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getCardSets(req, res);
        }
    }
}

async function getCardSets(req: NextApiRequest, res: NextApiResponse) {
  try {
      let { collections } = await connectToDatabase();
      const cardSets = await collections.cardSets?.find().toArray()
      return res.json(cardSets)
  } catch (error: any) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}