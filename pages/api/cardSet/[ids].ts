import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { UserCookie } from "../../../constants/UserCookie";
import { connectToDatabase } from "../../../mongodb";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'DELETE': {
            return deleteCardSets(req, res);
        }
    }
}, UserCookie)

async function deleteCardSets(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();
  const idsToDelete = (req.query.ids as string).split(',')

  const cardSets = await collections.cardSets?.find({ id: { $in: idsToDelete } }).toArray()

  if (!req.session.user?.isAuth || !req.session.user?.email) {
    return res.status(401).json({ error: "User is not logged in" })
  } else if (cardSets?.some((cardSet) => cardSet.author !== req.session.user?.email)) {
    return res.status(401).json({ error: "A card set to be deleted is not owned by the logged in user" })
  }

  const dbResult = await collections.cardSets?.deleteMany({ id: { $in: idsToDelete } })

  if (dbResult?.acknowledged)
    res.json({ message: `Successfully deleted ${dbResult.deletedCount}` })
  else
    res.json({ error: `Could not delete card set(s) '${idsToDelete}'.` })

}