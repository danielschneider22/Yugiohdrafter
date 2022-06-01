import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { CardSet } from "../../../constants/CardSet";
import { UserCookie } from "../../../constants/UserCookie";
import { connectToDatabase } from "../../../mongodb";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST': {
            return postCardSet(req, res);
        }
    }
}, UserCookie)

async function postCardSet(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();

  const cardSet = await collections.cardSets?.findOne({ id: req.body.id })

  if (!req.session.user?.isAuth || !req.session.user?.email) {
    return res.status(401).json({ error: "User is not logged in" })
  } else if (cardSet && cardSet.author !== req.session.user?.email) {
    return res.status(401).json({ error: "Cannot edit a card set belonging to a different user" })
  }

  
  const customSet: CardSet = {
    custom_set: req.body.custom_set,
    id: req.body.id,
    num_of_cards: req.body.num_of_cards,
    set_code: req.body.set_code,
    set_name: req.body.set_name,
    tcg_date: req.body.tcg_date,
    author: req.session.user.email,
    card_ids: req.body.card_ids
  }
  const dbResult = await collections.cardSets?.insertOne(customSet)

  if (dbResult?.acknowledged)
    res.json(customSet)
  else
    res.json({ error: `Could not insert card set '${req.body.set_name}'` })
}
