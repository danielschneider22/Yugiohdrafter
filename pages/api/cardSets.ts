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
      let { db } = await connectToDatabase();
      const cardSetsCollection: Collection = db.collection('cardSets');
      const setsFromDb = await cardSetsCollection?.find().toArray()
      return res.json(setsFromDb)
  } catch (error: any) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}