import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../mongodb";
import bcrypt from 'bcrypt';
import { User } from "../../../constants/User";
import { withIronSessionApiRoute } from "iron-session/next";
import { addUserToSession } from "../../../helpers/loginsessionhelper";
import { UserCookie } from "../../../constants/UserCookie";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
    let { collections } = await connectToDatabase();

    const users: User[] = await collections.users?.find().toArray()!
    const user = users.find((user) => user.email === req.body.email)

    if (user) {
      return res.status(500).json({ error: "User already exists with this email" })
    }
    try {
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const user: User = { email: req.body.email, password: hashedPassword }
      const dbResult = await collections.users?.insertOne(user)
      if (dbResult?.acknowledged) {
        await(addUserToSession(req, req.body.email))
      }
      else
        return res.status(500).json({ error: `Could not create user '.` })
      return res.json(dbResult);
    }
    catch (e) {
      return res.status(500).end();
    }
  },
  UserCookie
)