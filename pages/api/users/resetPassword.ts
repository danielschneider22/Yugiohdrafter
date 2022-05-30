import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../mongodb";
import { resetPasswordDict } from "../../../state/resetPasswords";
import bcrypt from 'bcrypt';
import { addUserToSession } from "../../../helpers/loginsessionhelper";
import { UserCookie } from "../../../constants/UserCookie";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();
  
  console.log(resetPasswordDict)
  const email = resetPasswordDict[req.body.uuid]
  if (!email) {
    return res.status(401).json({ error: "No email recovery sent for this account." })
  }
  const users = await collections.users?.find().toArray()!
  const user = users.find((user) => user.email === email)
  if (!user) {
    return res.status(400).json({ error: "Cannot find this email address" })
  }
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const dbResult = await collections.users?.updateOne({ email }, { $set: { password: hashedPassword } })

    if (dbResult?.acknowledged) {
      await(addUserToSession(req, req.body.email))
    }
    else
      return res.status(500).json({ error: `Could not update password '` })
    return res.json(dbResult);
  }
  catch (e) {
    return res.status(500).end();
  }
},
  UserCookie
  )