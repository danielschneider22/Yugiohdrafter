import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../mongodb";
import bcrypt from 'bcrypt';
import { addUserToSession } from "../../../helpers/loginsessionhelper";
import { UserCookie } from "../../../constants/UserCookie";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();

  const users = await collections.users?.find().toArray()!
  const user = users.find((user) => user.email === req.body.email)

  if (!user) {
    return res.status(400).json({ error: "Cannot find this email address" })
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      await(addUserToSession(req, req.body.email))
      return res.send("Success")
    } else {
      return res.status(401).json({ error: "Incorrect Password" })
    }
  }
  catch (e) {
    return res.status(500).end()
  }
  },
  UserCookie
)