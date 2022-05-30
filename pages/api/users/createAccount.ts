import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../mongodb";
import bcrypt from 'bcrypt';
import { User } from "../../../models/User";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();
  const userCollection: Collection<User> = db.collection('users');
  const users: User[] = await userCollection?.find().toArray()!
  const user = users.find((user) => user.email === req.body.email)
  if (user) {
    return res.status(500).json({ error: "User already exists with this email" })
  }
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user: User = { email: req.body.email, password: hashedPassword }
    const dbResult = await userCollection?.insertOne(user)

    console.log(dbResult)

    if (dbResult?.acknowledged) {
      req.session.user = {
        isAuth: true,
        email: req.body.email,
      };
      await req.session.save();
    }
    else
      return res.status(500).json({ error: `Could not create user '.` })
    return res.json(dbResult);
  }
  catch (e) {
    return res.status(500).end();
  }
},
{
  cookieName: "user",
  password: "HswQ64dwc3E1dmvFL8LyTE5Cz5zda3eP",
  cookieOptions: {
      secure: process.env.NODE_ENV === "production",
  },
}
)