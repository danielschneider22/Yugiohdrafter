import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../mongodb";
import nextSession from "next-session";
import bcrypt from 'bcrypt';
import { User } from "../../../models/User";

const getSession = nextSession();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userSession = await getSession(req, res);

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
      userSession.isAuth = true;
      userSession.email = req.body.email;
    }
    else
      return res.status(500).json({ error: `Could not create user '.` })
    return res.json(dbResult);
  }
  catch (e) {
    return res.status(500).end();
  }
}